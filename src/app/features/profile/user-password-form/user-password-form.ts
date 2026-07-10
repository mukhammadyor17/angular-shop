import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../password-match.validator';

@Component({
  selector: 'app-user-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-password-form.html',
  styleUrl: './user-password-form.scss',
})
export class UserPasswordForm {
  private fb = inject(FormBuilder);

  passwordForm = this.fb.group ({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/),]],
      confirmPassword: ['', Validators.required,],
    },
    {validators: passwordMatchValidator(),}
  ) 

  passwordSubmitted = output<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  }>();

  submitPassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

  const {currentPassword, newPassword, confirmPassword, } = this.passwordForm.getRawValue();

  this.passwordSubmitted.emit({
    currentPassword: currentPassword ?? '',
    newPassword: newPassword ?? '',
    confirmPassword: confirmPassword ?? '',
  });

  this.passwordForm.reset();
}
}
