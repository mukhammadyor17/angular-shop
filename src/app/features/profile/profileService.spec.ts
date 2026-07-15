import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController, } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { DeliveryAddress } from '../../shared/models/delivery-address.model';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load current user', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      role: 'USER',
      photoUrl: '',
      dateOfBirth: '2000-01-01',
      createdAt: '',
      updatedAt: '',
    };

    service.getProfile()
    .subscribe(user => { 
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/auth/@me`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockUser);
  });

  it('should update profile', () => {
    const body = {
      firstName: 'Jane',
      lastName: 'Smith',
    };

    service.updateProfile(body).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/auth/@me`
    );

    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(body);

    req.flush({});
  });

  it('should change password', () => {
    const body = {
      currentPassword: 'old12345',
      newPassword: 'new12345',
      confirmPassword: 'new12345',
    };

    service.changePassword(body).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/auth/change-my-password`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush({});
  });

  it('should load delivery addresses', () => {
    const addresses: DeliveryAddress[] = [];

    service.getAddresses().subscribe(result => {
      expect(result).toEqual(addresses);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/delivery-addresses`
    );

    expect(req.request.method).toBe('GET');

    req.flush(addresses);
  });
});