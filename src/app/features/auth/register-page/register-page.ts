import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/toast/toast.service';

const urlPattern = /^(https?:\/\/)[\w.-]+(\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/;

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    photoUrl: ['', [Validators.pattern(urlPattern)]],
  });

  submitted = false;

  get firstName() {
    return this.form.controls.firstName;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }
  get photoUrl() {
    return this.form.controls.photoUrl;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const payload = {
        dateOfBirth: '2000-01-01',
        email: this.form.value.email as string,
        firstName: this.form.value.firstName as string,
        lastName: this.form.value.lastName as string,
        password: this.form.value.password as string,
        photoUrl: this.form.value.photoUrl as string,
      };
      this.authService.register(payload).subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.toast.error('Registration failed. Please try again.'),
      });
    }
  }
}
