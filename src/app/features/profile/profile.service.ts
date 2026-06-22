import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3031'; 

  getProfile(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/auth/@me`
    );
  }

  /* partial<User> allows updating only changed fields without requiring the whole user obj */
  updateProfile(data: Partial<User>) {
    return this.http.patch(
      `${this.apiUrl}/auth/@me`, data
    );
  }

  /** avatar updating */
  changePhoto(photoUrl: string) {
    return this.http.patch(
      `${this.apiUrl}/auth/change-photo`,
      { photoUrl, }
    );
  }

  /* change password logic */
  changePassword (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.http.post(`${this.apiUrl}/auth/change-my-password`, data)
  }
  
}
