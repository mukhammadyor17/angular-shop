import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProductPage } from './detailed-product-page';

describe('DetailedProductPage', () => {
  let component: DetailedProductPage;
  let fixture: ComponentFixture<DetailedProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
