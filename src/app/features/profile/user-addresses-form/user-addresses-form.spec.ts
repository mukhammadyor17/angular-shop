import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressesForm } from './user-addresses-form';

describe('UserAddressesForm', () => {
  let component: UserAddressesForm;
  let fixture: ComponentFixture<UserAddressesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddressesForm);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('addresses', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit create event for new address', () => {
    const spy = vi.fn();

    component.create.subscribe(spy);

    component.addAddress();

    component.addressesForm.at(0).patchValue({
      fullName: 'John Doe',
      phone: '995333333333',
      country: 'Georgia',
      city: 'Mestia',
      street: 'Vazha Pshavela',
      building: '3',
    });

    component.saveAddress(0);

    expect(spy).toHaveBeenCalled();
  });

  it('should remove unsaved address', () => {
    component.addAddress();

    expect(component.addressesForm.length).toBe(1);

    component.deleteAddress(0);

    expect(component.addressesForm.length).toBe(0);
  });
});