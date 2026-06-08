import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = 'http://loacalhost:3000'; 

  getProfile(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/users/me`
    );
  }

  /* partial<User> allows updating only changed fields without requiring the whole user obj */
  updateProfile(data: Partial<User>) {
    return this.http.patch(
      `${this.apiUrl}/user/me`, data
    );
  }

  /** avatar updating */
  changePhoto(avatarUrl: string) {
    return this.http.patch(
      `${this.apiUrl}/auth/change-photo`,
      { avatarUrl, }
    );
  }
}
