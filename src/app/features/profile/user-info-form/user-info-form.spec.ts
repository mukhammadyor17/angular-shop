import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoForm } from './user-info-form';

describe('UserInfoForm', () => {
  let component: UserInfoForm;
  let fixture: ComponentFixture<UserInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoForm);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('user', {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      dateOfBirth: '2000-01-01',
      photoUrl: '',
      role: 'USER',
      createdAt: '',
      updatedAt: '',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit save event', () => {
    const spy = vi.fn();

    component.save.subscribe(spy);

    component.profileForm.patchValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@test.com',
      dateOfBirth: '2001-01-01',
      photoUrl: '',
    });

    component.saveProfile();

    expect(spy).toHaveBeenCalled();
  });
});