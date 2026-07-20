import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { ProfilePage } from './profile-page';
import { ProfileService } from '../profile/profile.service';
import { User } from '../../shared/models/user.model';
import { DeliveryAddress } from '../../shared/models/delivery-address.model';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let profileServiceMock: {
    getProfile: ReturnType<typeof vi.fn>;
    updateProfile: ReturnType<typeof vi.fn>;
    changePassword: ReturnType<typeof vi.fn>;
    getAddresses: ReturnType<typeof vi.fn>;
    createAddress: ReturnType<typeof vi.fn>;
    updateAddress: ReturnType<typeof vi.fn>;
    deleteAddress: ReturnType<typeof vi.fn>;
    setDefaultAddress: ReturnType<typeof vi.fn>;
  };

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    photoUrl: null,
    dateOfBirth: '2000-01-01',
    role: 'user',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  };

  const mockAddress: DeliveryAddress = {
    id: 'a1',
    fullName: 'John Doe',
    phone: '+995000000000',
    country: 'Georgia',
    city: 'Tbilisi',
    street: 'Rustaveli Ave',
    building: '12',
    apartment: '4',
    postalCode: '0000',
    comment: null,
    isDefault: true,
  };

  const mockAddress2: DeliveryAddress = {
    id: 'a2',
    fullName: 'John Doe',
    phone: '+995222222222',
    country: 'Georgia',
    city: 'Batumi',
    street: 'Sea St',
    building: '1',
    apartment: null,
    postalCode: '1111',
    comment: null,
    isDefault: false,
  };

  beforeEach(() => {
    profileServiceMock = {
      getProfile: vi.fn().mockReturnValue(of(mockUser)),
      updateProfile: vi.fn().mockReturnValue(of(mockUser)),
      changePassword: vi.fn().mockReturnValue(of(void 0)),
      getAddresses: vi.fn().mockReturnValue(of([mockAddress, mockAddress2])),
      createAddress: vi.fn().mockReturnValue(of(mockAddress)),
      updateAddress: vi.fn().mockReturnValue(of(mockAddress)),
      deleteAddress: vi.fn().mockReturnValue(of(void 0)),
      setDefaultAddress: vi.fn().mockReturnValue(of(void 0)),
    };

    TestBed.configureTestingModule({
      providers: [ProfilePage, { provide: ProfileService, useValue: profileServiceMock }],
    });

    // avoid rendering child form components, whose own dependencies we don't control here
    TestBed.overrideComponent(ProfilePage, { set: { template: '' } });

    component = TestBed.createComponent(ProfilePage).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load profile and set the user signal', () => {
      component.ngOnInit();

      expect(profileServiceMock.getProfile).toHaveBeenCalled();
      expect(component.user()).toEqual(mockUser);
    });

    it('should load addresses and set the addresses signal', () => {
      component.ngOnInit();

      expect(profileServiceMock.getAddresses).toHaveBeenCalled();
      expect(component.addresses()).toEqual([mockAddress, mockAddress2]);
    });

    it('should reset isLoadingAddresses to false after addresses load', () => {
      expect(component.isLoadingAddresses()).toBe(false);

      component.ngOnInit();

      expect(component.isLoadingAddresses()).toBe(false);
    });

    it('should reset isLoadingAddresses to false on error', () => {
      profileServiceMock.getAddresses.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.ngOnInit();

      expect(component.isLoadingAddresses()).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load addresses', expect.any(Error));
    });
  });

  describe('saveProfile', () => {
    it('should call updateProfile and reload the profile on success', () => {
      component.saveProfile({ firstName: 'Jane' });

      expect(profileServiceMock.updateProfile).toHaveBeenCalledWith({ firstName: 'Jane' });
      expect(profileServiceMock.getProfile).toHaveBeenCalled();
      expect(component.user()).toEqual(mockUser);
    });

    it('should log an error and not reload profile on failure', () => {
      profileServiceMock.updateProfile.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.saveProfile({ firstName: 'Jane' });

      expect(consoleErrorSpy).toHaveBeenCalledWith('Profile update failed', expect.any(Error));
      expect(profileServiceMock.getProfile).not.toHaveBeenCalled();
    });
  });

  describe('changePassword', () => {
    const passwordData = {
      currentPassword: 'old123',
      newPassword: 'new123',
      confirmPassword: 'new123',
    };

    it('should call profileService.changePassword with form data', () => {
      component.changePassword(passwordData);

      expect(profileServiceMock.changePassword).toHaveBeenCalledWith(passwordData);
    });

    it('should log an error on failure', () => {
      profileServiceMock.changePassword.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.changePassword(passwordData);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Password update failed', expect.any(Error));
    });
  });

  describe('createAddress', () => {
    it('should call createAddress, reload addresses, and reset isSavingAddress', () => {
      component.createAddress(mockAddress);

      expect(profileServiceMock.createAddress).toHaveBeenCalledWith(mockAddress);
      expect(profileServiceMock.getAddresses).toHaveBeenCalled();
      expect(component.isSavingAddress()).toBe(false);
    });

    it('should reset isSavingAddress and log error on failure', () => {
      profileServiceMock.createAddress.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.createAddress(mockAddress);

      expect(component.isSavingAddress()).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create address', expect.any(Error));
    });
  });

  describe('updateAddress', () => {
    it('should call updateAddress with id and payload, then reload addresses', () => {
      component.updateAddress(mockAddress);

      expect(profileServiceMock.updateAddress).toHaveBeenCalledWith(mockAddress.id, mockAddress);
      expect(profileServiceMock.getAddresses).toHaveBeenCalled();
      expect(component.isSavingAddress()).toBe(false);
    });

    it('should reset isSavingAddress and log error on failure', () => {
      profileServiceMock.updateAddress.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.updateAddress(mockAddress);

      expect(component.isSavingAddress()).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to update address', expect.any(Error));
    });
  });

  describe('deleteAddress', () => {
    it('should call deleteAddress with id, then reload addresses', () => {
      component.deleteAddress(mockAddress.id);

      expect(profileServiceMock.deleteAddress).toHaveBeenCalledWith(mockAddress.id);
      expect(profileServiceMock.getAddresses).toHaveBeenCalled();
      expect(component.isSavingAddress()).toBe(false);
    });

    it('should reset isSavingAddress and log error on failure', () => {
      profileServiceMock.deleteAddress.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.deleteAddress(mockAddress.id);

      expect(component.isSavingAddress()).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to delete address', expect.any(Error));
    });
  });

  describe('setDefaultAddress', () => {
    it('should call setDefaultAddress with id, then reload addresses', () => {
      component.setDefaultAddress(mockAddress.id);

      expect(profileServiceMock.setDefaultAddress).toHaveBeenCalledWith(mockAddress.id);
      expect(profileServiceMock.getAddresses).toHaveBeenCalled();
      expect(component.isSavingAddress()).toBe(false);
    });

    it('should reset isSavingAddress and log error on failure', () => {
      profileServiceMock.setDefaultAddress.mockReturnValue(throwError(() => new Error('fail')));
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.setDefaultAddress(mockAddress.id);

      expect(component.isSavingAddress()).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to set default address', expect.any(Error));
    });
  });
});