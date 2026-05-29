import { TestBed } from '@angular/core/testing';

import { CommercetoolsProducts } from './commercetools-products';

describe('CommercetoolsProducts', () => {
  let service: CommercetoolsProducts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercetoolsProducts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
