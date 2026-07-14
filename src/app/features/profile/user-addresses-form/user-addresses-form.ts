import { Component, effect, inject, input, output, } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DeliveryAddress } from '../../../shared/models/delivery-address.model';

@Component({
  selector: 'app-user-addresses-form',
  imports: [ReactiveFormsModule,],
  templateUrl: './user-addresses-form.html',
  styleUrl: './user-addresses-form.scss',
})
export class UserAddressesForm{

  private fb = inject(FormBuilder);

  addresses = input.required<DeliveryAddress[]>();

  isLoading = input(false);
  isSaving = input(false);

  create = output<DeliveryAddress>();
  update = output<DeliveryAddress>();
  delete = output<string>();
  setDefault = output<string>();

  addressForm: FormArray = this.fb.array([]);

  constructor() {
    effect(() => {
      this.addressForm.clear();

      this.addresses().forEach(address => {
        this.addressForm.push(
          this.createAddressForm(address)
        );
      });
    });
  }

  get addressesForm(): FormArray {
    return this.addressForm;
  }

  private createAddressForm(address?: DeliveryAddress) {
    return this.fb.group ({
    id: [address?.id ?? ''],
    fullName: [address?.fullName ?? '', Validators.required,],
    phone: [address?.phone ?? '', Validators.required,],
    country: [address?.country ?? '',],
    city: [address?.city ?? '', Validators.required,],
    street: [address?.street ?? '', Validators.required,],
    building: [address?.building ?? '', Validators.required,],
    appartment: [address?.appartment ?? '',],
    postalCode: [address?.postalCode ?? '',],
    comment: [address?.comment ?? '',],
    isDefault: [address?.isDefault ?? false,],
    })
  }

  /* addinf adress*/ 
  addAddress(): void {
  this.addressForm.push(this.createAddressForm());

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
  }

  /* saving address --> update existance or make new one*/
  saveAddress(index: number): void {
    const form = this.addressForm.at(index);

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const value = form.getRawValue() as DeliveryAddress;

    if (!value.id) {
      this.create.emit(value);
      return;
    }

    this.update.emit(value);
  }

  /* delete address logic*/
  deleteAddress(index: number): void {
    const id = this.addressForm.at(index).get('id')?.value;

    if (!id) {
      this.addressForm.removeAt(index);
      return;
    }

    this.delete.emit(id);
  }

  /* set address as default */
  setDefaultAddress(index: number): void {
    const id = this.addressForm.at(index).get('id')?.value;

    if (!id) { return; }

    this.setDefault.emit(id);
  }
}