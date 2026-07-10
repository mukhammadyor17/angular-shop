import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileService } from '../profile/profile.service';
import { User } from '../../shared/models/user.model';
import { DeliveryAddress } from '../../shared/models/delivery-address.model';
import { UserInfoForm } from './user-info-form/user-info-form';
import { UserPasswordForm } from './user-password-form/user-password-form';
import { UserAddressesForm } from './user-addresses-form/user-addresses-form';


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    UserInfoForm,
    UserPasswordForm,
    UserAddressesForm,
  ],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss'],
})
export class ProfilePage implements OnInit{
  private profileService = inject(ProfileService);

  user = signal<User | null>(null);
  addresses = signal<DeliveryAddress[]>([]); 
  isLoadingAddresses = signal(false);
  isSavingAddress = signal(false);

  /* User profile */
  private loadProfile() {
    this.profileService
        .getProfile()
        .subscribe(user => this.user.set(user));
  }

  saveProfile(data: Partial<User>): void {
    this.profileService
      .updateProfile(data)
      .subscribe({
        next: () => {
          // reload fresh data from the server
          this.loadProfile(); 
        },
        error: (err) => {
          console.error('Profile update failed', err);
        },
      });
  }
  
  /* PASSWORD */
  changePassword(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;}): void {

  this.profileService
    .changePassword(data)
    .subscribe({
      next: () => {
        console.log('Password updated successfully');
      },
      error: (err) => {
        console.error('Password update failed', err);
      },
    });
  }

  /* addresses handling */
  ngOnInit(): void {
    this.loadProfile();
    this.loadAddresses();
  }

  private loadAddresses(): void {
    this.isLoadingAddresses.set(true);

    this.profileService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses.set(addresses);
        this.isLoadingAddresses.set(false);
      },
      error: (err) => {
        console.error('Failed to load addresses', err);
        this.isLoadingAddresses.set(false);
      },
    });
  }

  createAddress(address: DeliveryAddress): void {
    this.isSavingAddress.set(true);

    this.profileService.createAddress(address).subscribe({
      next: () => {
        this.loadAddresses();
        this.isSavingAddress.set(false);
      },
      error: (err) => {
        console.error('Failed to create address', err);
        this.isSavingAddress.set(false);
      },
    });
  }

  updateAddress(address: DeliveryAddress): void {
    this.isSavingAddress.set(true);

    this.profileService
      .updateAddress(address.id, address)
      .subscribe({
        next: () => {
          this.loadAddresses();
          this.isSavingAddress.set(false);
        },
        error: (err) => {
          console.error('Failed to update address', err);
          this.isSavingAddress.set(false);
        },
      });
  }

  deleteAddress(id: string): void {
    this.isSavingAddress.set(true);

    this.profileService.deleteAddress(id).subscribe({
      next: () => {
        this.loadAddresses();
        this.isSavingAddress.set(false);
      },
      error: (err) => {
        console.error('Failed to delete address', err);
        this.isSavingAddress.set(false);
      },
    });
  }

  setDefaultAddress(id: string): void {
    this.isSavingAddress.set(true);

    this.profileService.setDefaultAddress(id).subscribe({
      next: () => {
        this.loadAddresses();
        this.isSavingAddress.set(false);
      },
      error: (err) => {
        console.error('Failed to set default address', err);
        this.isSavingAddress.set(false);
      },
    });
  }
}