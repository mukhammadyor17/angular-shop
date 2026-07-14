import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitted = false;
  loginError = '';

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginError = '';
      const payload = {
        email: this.form.value.email as string,
        password: this.form.value.password as string,
      };
      this.authService
        .login(payload)
        .pipe(switchMap(() => this.authService.getMe()))
        .subscribe({
          next: (user: User) => {
            localStorage.setItem('role', user.role);

            const route = user.role === 'ADMIN' ? '/admin' : '/';
            this.router.navigate([route]);
          },
          error: () => (this.loginError = 'Invalid email or password.'),
        });
    }
  }
}
