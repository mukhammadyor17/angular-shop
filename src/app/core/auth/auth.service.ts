import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  photoUrl: string;
}

interface LoginResponse {
  accessToken: string;
}

interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  role: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private accessToken: string | null = null;

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string {
    return this.accessToken ? this.accessToken : (localStorage.getItem('accessToken') as string);
  }

  login(payload: LoginPayload) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, payload).pipe(
      tap((response: LoginResponse) => {
        this.accessToken = response.accessToken;
        localStorage.setItem('accessToken', response.accessToken);
      }),
    );
  }

  register(payload: RegisterPayload) {
    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }

  getMe() {
    return this.http.get<UserResponse>(`${this.baseUrl}/auth/@me`);
  }

  updateMe(payload: Partial<RegisterPayload>) {
    return this.http.patch(`${this.baseUrl}/auth/@me`, payload);
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  }
}
