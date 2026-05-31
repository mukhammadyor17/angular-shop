import { TestBed } from '@angular/core/testing';

import { CommercetoolsAuth } from './commercetools-auth.service';

describe('CommercetoolsAuth', () => {
  let service: CommercetoolsAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercetoolsAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
