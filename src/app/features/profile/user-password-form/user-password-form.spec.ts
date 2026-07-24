import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordForm } from './user-password-form';

describe('UserPasswordForm', () => {
  let component: UserPasswordForm;
  let fixture: ComponentFixture<UserPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPasswordForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit passwordSubmitted', () => {
    const spy = vi.fn();

    component.passwordSubmitted.subscribe(spy);

    component.passwordForm.setValue({
      currentPassword: 'oldPass123',
      newPassword: 'newPass123',
      confirmPassword: 'newPass123',
    });

    component.submitPassword();

    expect(spy).toHaveBeenCalledWith({
      currentPassword: 'oldPass123',
      newPassword: 'newPass123',
      confirmPassword: 'newPass123',
    });
  });

  it('should not emit when form is invalid', () => {
    const spy = vi.fn();

    component.passwordSubmitted.subscribe(spy);

    component.submitPassword();

    expect(spy).not.toHaveBeenCalled();
  });
});