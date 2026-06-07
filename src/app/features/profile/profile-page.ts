import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BaseTitle } from '../../shared/ui/base-title/base-title';
import { ProfileCard } from '../../shared/ui/profile-card/profile-card';
import { ProfileService } from '../profile/profile.service';
import { User } from '../../shared/models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-page',
  imports: [BaseTitle, ProfileCard, ReactiveFormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
    private fb = inject(FormBuilder);
    private profileService = inject(ProfileService);
    private destroyRef = inject(DestroyRef);
    /* signal cause UI state is local & reactive, instead of RxJs here */
    isEditMode = signal (false);

    /* reactive forms */
    profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2),],],
      email: ['', [Validators.required, Validators.email,],],
      birthDate: ['', Validators.required],
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
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
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

      const {name, email, birthDate, photoUrl,} = this.profileForm.getRawValue();

      this.profileService.updateProfile({
        name: name || '', 
        email: email || '', 
        birthDate: birthDate || null,
        }).subscribe();

      this.profileService.changePhoto(photoUrl || '').subscribe();

      this.isEditMode.set(false);
    }
  }

