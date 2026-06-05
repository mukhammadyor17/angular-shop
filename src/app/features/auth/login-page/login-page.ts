import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitted = false;

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
