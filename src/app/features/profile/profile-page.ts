import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProfileService } from '../profile/profile.service';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { User } from '../../shared/models/user.model';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
    ,
    ProfileCard,
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
      name: ['', [Validators.required, Validators.minLength(2),],],
      email: ['', [Validators.required, Validators.email,],],
      avatarUrl: [''],
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
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
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

      const {name, email, avatarUrl,} = this.profileForm.getRawValue();

      this.profileService.updateProfile({
        name: name || '', 
        email: email || '', 
        }).subscribe();

      this.profileService.changePhoto(avatarUrl || '').subscribe();

      this.isEditMode.set(false);

      this.user.update((currentUser) => {
        if (!currentUser) {
          return null;
        }

        return {
          ...currentUser,
          name: name || '',
          email: email || '',
          avatarUrl: avatarUrl || '',
        }
      })
    }
  }

