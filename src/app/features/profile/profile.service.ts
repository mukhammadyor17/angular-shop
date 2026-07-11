import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { DeliveryAddress } from '../../shared/models/delivery-address.model';

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

  /* ------PARTIAL USER UPDATE------ */
  updateProfile(data: Partial<User>) {
    return this.http.patch(
      `${this.apiUrl}/auth/@me`, data
    );
  }

  /** ------AVATAR UPDATE------ */
  changePhoto(photoUrl: string) {
    return this.http.patch(
      `${this.apiUrl}/auth/change-photo`,
      { photoUrl, }
    );
  }

  /* ------PASSWORD------ */
  changePassword (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return this.http.post(`${this.apiUrl}/auth/change-my-password`, data)
  }

  /* ------ADDRESS MANAGEMENT------ */
  getAddresses(): Observable<DeliveryAddress[]> {
    return this.http.get<DeliveryAddress[]>(
      `${this.apiUrl}/delivery-addresses`
    );
  }

  createAddress(data: DeliveryAddress) {
    return this.http.post(`${this.apiUrl}/delivery-addresses`, data);
  }

  /* partial update only modified fields */
  updateAddress(id: string, data: Partial<DeliveryAddress>,) {
    return this.http.patch(`${this.apiUrl}/delivery-addresses/${id}`, data);
  }

  deleteAddress(id: string) {
    return this.http.delete(`${this.apiUrl}/delivery-addresses/${id}`,);
  }

  setDefaultAddress(id: string) {
    return this.http.patch(`${this.apiUrl}/delivery-addresses/${id}/default`, {},);
  }
}
