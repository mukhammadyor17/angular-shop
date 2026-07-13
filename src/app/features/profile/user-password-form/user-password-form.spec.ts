import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordForm } from './user-password-form';

describe('UserPasswordForm', () => {
  let component: UserPasswordForm;
  let fixture: ComponentFixture<UserPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPasswordForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
