import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressesForm } from './user-addresses-form';

describe('UserAddressesForm', () => {
  let component: UserAddressesForm;
  let fixture: ComponentFixture<UserAddressesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
