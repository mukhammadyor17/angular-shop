import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

import { ProfileService } from '../profile/profile.service';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { User } from '../../shared/models/user.model';
import { DeliveryAddress } from '../../shared/models/delivery-address.model';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    ProfileCard,
  ],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss'],
})
export class ProfilePage implements OnInit {

    private fb = inject(FormBuilder);
    private profileService = inject(ProfileService);
    
    
    /* signal cause UI state is local & reactive */
    isEditMode = signal (false);
    /* loading state */
    isSavingProfile = signal(false);
    /* for user state separate from form state */
    user = signal<User | null>(null);
    /* address */
    addresses = signal<DeliveryAddress[]>([]);
    isLoadingAddresses = signal(false);
    isSavingAddresses = signal(false);


    /* ------REACTIVE FORMS------ */
    /* profile form */
    profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2),],],
      lastName: ['', [Validators.required, Validators.minLength(2),],],
      email: ['', [Validators.required, Validators.email,],],
      dateOfBirth: ['', Validators.required],
      photoUrl: [''],
    });

    /* change password form implementation */
    passwordForm = this.fb.group ({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),]],
      confirmPassword: ['', Validators.required,],
    },
    {validators: passwordMatchValidator(),}
    );

    /* delivery adresses */
    addressForm: FormArray = this.fb.array([]);



    ngOnInit(): void {
      this.loadProfile();
      this.loadAddresses();
    }

    /* ------PROFILE------ */  
    private loadProfile(): void {
      this.profileService
      .getProfile()
      .subscribe({
        next: (user) => {
          this.user.set(user);
          this.patchProfileForm(user);
        }
        ,
        error: (err) => {
          console.log('failed to load profile', err);
        },
      });
    }   
      private patchProfileForm(user: User): void {   
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.dateOfBirth?.split('T')[0],
          photoUrl: user.photoUrl,
        });
      };
    

    /* edit mode - cancel button restore original data */
    toggleEditMode(): void {
      if (this.isEditMode()) {
        const user = this.user();

        if (user) {
          this.patchProfileForm(user);
          }
        }
        this.isEditMode.update((value) => !value);
      }

    /* save form mode */
    saveProfile(): void {
      /* validation guard prevent invalid api req and user feedback consistency */
      if (this.profileForm.invalid) {
        this.profileForm.markAllAsTouched();
        return
      }

      const {firstName, lastName, email, dateOfBirth, photoUrl,} = this.profileForm.getRawValue();

      this.isSavingProfile.set(true);

      this.profileService.updateProfile({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        dateOfBirth: dateOfBirth || null,
        photoUrl: photoUrl || '',
      })
        .subscribe({
            next: () => {
              this.user.update(currentUser => {
            if (!currentUser) {return null;}

        return {
          ...currentUser,
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          dateOfBirth: dateOfBirth || null,
          photoUrl: photoUrl || '',
        };
      });

      this.isEditMode.set(false);
      this.isSavingProfile.set(false);
    },

        error: (err) => {
          console.error('profile update failed',err);

      this.isSavingProfile.set(false);
    },
  });
};


  /* ------PASSWORD------ */
    savePassword(): void {
      if (this.passwordForm.invalid) {
        this.passwordForm.markAllAsTouched();
        return;
      }
      /* take values from form, destructuring*/
      const {currentPassword, newPassword, confirmPassword} = this.passwordForm.getRawValue(); 

      this.profileService.changePassword({
        currentPassword: currentPassword || '',
        newPassword: newPassword || '',
        confirmPassword: confirmPassword || '',
      })
      .subscribe({
        /* sensitive data, clean up after being updated */
        next: () => {this.passwordForm.reset();
        }
      });
    }


    /* ------ADDRESS------ */
    get addressesForm(): FormArray {
      return this.addressForm;
    }
    
    private createAddressForm( address?: DeliveryAddress,) {
      return this.fb.group({
        id: [address?.id ?? '',],
        fullName: [address?.fullName ?? '', Validators.required,],
        phone: [address?.phone ?? '', Validators.required,],
        country: [address?.country ?? '',],
        city: [address?.city ?? '', Validators.required,],
        street: [ address?.street ?? '', Validators.required,],
        building: [address?.building ?? '', Validators.required,],
        appartment: [address?.appartment ?? '',],
        postalCode: [address?.postalCode ?? '',],
        comment: [address?.comment ?? '',],
        isDefault: [address?.isDefault ?? false,],
      });
    }

    private loadAddresses(): void {
      this.isLoadingAddresses.set(true);

      this.profileService
      .getAddresses()
      .subscribe({
        next: addresses => {
          this.addresses.set(addresses);
          this.addressForm.clear();

          addresses.forEach(address => {
            this.addressForm.push(this.createAddressForm(address,),
            );
          });

          this.isLoadingAddresses.set(false);
        },
          error: () => {
            this.isLoadingAddresses.set(false);
          },
        });
    }
    
    private refreshAddresses(): void {
      this.loadAddresses();
      this.isSavingAddresses.set(false);
    }
    
    addAddress(): void {
      this.addressForm.push(this.createAddressForm(),);
    }

    /* saving address logic*/
    saveAddress(index: number,): void {
      const form = this.addressForm.at(index);

      if (form.invalid) {
        form.markAllAsTouched();
        return;
      } 

      this.isSavingAddresses.set(true);

      const value = form.getRawValue() as DeliveryAddress;
      
      if (!value.id) {
        this.profileService
        .createAddress(value)
        .subscribe({
          next: () => {
            this.refreshAddresses();
          },
          error: () => {
            this.isSavingAddresses.set(false);
          },
        })
        return;
      }

      if (value.id) {
        this.profileService
        .updateAddress(value.id, value)
        .subscribe({
          next: () => {
            this.refreshAddresses();
          },
          error: () => {
            this.isSavingAddresses.set(false);
          },
        });
      }
    }

    /* deleting address */ 
    deleteAddress(index: number): void {
      const form = this.addressForm.at(index);
      const id = form.get('id')?.value;

      if (!id) {
        this.addressesForm.removeAt(index);
        return;
      }

        this.profileService
        .deleteAddress(id)
        .subscribe({
          next: () => {
            this.loadAddresses();
          },
        });   
    }

    setDefaultAddress(index: number): void {
      const id = this.addressForm.at(index).get('id')?.value;

      if (!id) {
        return;
      }

      this.profileService
      .setDefaultAddress(id)
      .subscribe({
        next: () => {
          this.loadAddresses();
        }
      })
    }
  }
