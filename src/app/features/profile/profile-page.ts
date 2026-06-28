import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

import { ProfileService } from '../profile/profile.service';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { User } from '../../shared/models/user.model';
import { BaseTitle } from '../../shared/ui/base-title/base-title';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    ProfileCard,
    BaseTitle,
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

    /* REACTIVE FORMS */
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

    // loading profile
    ngOnInit(): void {
      this.loadProfile();
    }

    private loadProfile(): void {
      this.profileService
      .getProfile()
      .subscribe({
        next: (user) => {
          this.user.set(user);
          this.patchProfileForm(user);
        },
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
  }
