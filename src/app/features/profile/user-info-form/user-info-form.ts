import { Component, inject, signal, input, output, effect, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.scss',
})
export class UserInfoForm {
  private fb = inject(FormBuilder);  

  isEditMode = signal(false);
  isSavingProfile = signal (false);
  user = input.required<User>();
  // @Output() save = new EventEmitter<Partial<User>>();
  save = output<Partial<User>>();

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2),],],
    lastName: ['', [Validators.required, Validators.minLength(2),],],
    email: ['', [Validators.required, Validators.email,],],
    dateOfBirth: ['', Validators.required],
    photoUrl: [''],
  })

  constructor() {
    effect(() => {
      this.patchProfileForm(this.user());
  });
  }

  private patchProfileForm(user: User): void {
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      photoUrl: user.photoUrl,
    })
  }

  /* edit mode - cancel button restore original data */
  toggleEditMode(): void {
    if (this.isEditMode()) {
      const user = this.user();

      if (user) {
        this.patchProfileForm(user);
      }      
    }
    this.isEditMode.update(value => !value);
  }  

  saveProfile(): void {
  if (this.profileForm.invalid) {
    this.profileForm.markAllAsTouched();
    return;
  }

  const { firstName, lastName, email, dateOfBirth, photoUrl, } = this.profileForm.getRawValue();

  this.save.emit({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    dateOfBirth: dateOfBirth || '',
    photoUrl: photoUrl || '',
  });
}
}