import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    private destroyRef = inject(DestroyRef); //destroy subscriptions
    
    /* signal cause UI state is local & reactive */
    isEditMode = signal (false);
    /* for user state separate from form state */
    user = signal<User | null>(null);

    /* reactive forms */
    profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2),],],
      lastName: ['', [Validators.required, Validators.minLength(2),],],
      email: ['', [Validators.required, Validators.email,],],
      dateOfBirth: ['', Validators.required],
      photoUrl: [''],
    });

    ngOnInit(): void {
      this.loadProfile();
    }

    private loadProfile(): void {
      this.profileService
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.user.set(user);            

          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            photoUrl: user.photoUrl,
          });
        },
      });
    }

    /* edit mode */
    toggleEditMode(): void {
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

      this.profileService.updateProfile({
        firstName: firstName || '', 
        lastName: lastName || '',
        email: email || '', 
        dateOfBirth: dateOfBirth || null,
        }).subscribe();

      this.profileService.changePhoto(photoUrl || '').subscribe();

      this.isEditMode.set(false);

      this.user.update((currentUser) => {
        if (!currentUser) {
          return null;
        }

        return {
          ...currentUser,
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          dateOfBirth: dateOfBirth || null,
          photoUrl: photoUrl || '',
        }
      })
    }

    /* change password logic implementation */
    passwordForm = this.fb.group ({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),]],
      confirmPassword: ['', Validators.required,],
    },
    {validators: passwordMatchValidator(),}
    )

    savePassword(): void {
      if (this.passwordForm.invalid) {
        this.passwordForm.markAllAsTouched();
        return;
      }

      const {currentPassword, newPassword, confirmPassword} = this.passwordForm.getRawValue();

      this.profileService.changePassword({
        currentPassword: currentPassword || '',
        newPassword: newPassword || '',
        confirmPassword: confirmPassword || '',
      }).subscribe({
        /* sensitive data, clean up after being updated */
        next: () => {this.passwordForm.reset();
        }
      });
    }
  }

