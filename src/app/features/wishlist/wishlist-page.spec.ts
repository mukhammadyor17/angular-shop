import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { WishlistPage } from './wishlist-page';
import { WishlistService } from './wishlist.service';
import { CartService } from '../cart/cart.service';
import { ToastService } from '../../core/toast/toast.service';
import { Product } from '../../shared/models/product.model';

describe('WishlistPage', () => {
  let component: WishlistPage;
  let fixture: ComponentFixture<WishlistPage>;
  let wishlistServiceMock: {
    wishlist: ReturnType<typeof signal<Product[]>>;
    removeFromWishLIst: ReturnType<typeof vi.fn>;
    clearWishList: ReturnType<typeof vi.fn>;
  };
  let cartServiceMock: { addItem: ReturnType<typeof vi.fn> };
  let toastServiceMock: { info: ReturnType<typeof vi.fn> };

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    slug: 'test-product',
    imageUrl: '/test.jpg',
    rating: 4.5,
    price: 100,
    oldPrice: null,
    discount: null,
  };

  beforeEach(async () => {
    wishlistServiceMock = {
      wishlist: signal<Product[]>([mockProduct]),
      removeFromWishLIst: vi.fn(),
      clearWishList: vi.fn(),
    };
    cartServiceMock = { addItem: vi.fn() };
    toastServiceMock = { info: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [WishlistPage],
      providers: [
        provideRouter([]),
        { provide: WishlistService, useValue: wishlistServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose wishlistItems from the service', () => {
    expect(component.wishlistItems()).toEqual([mockProduct]);
  });

  it('should compute totalItems based on wishlist length', () => {
    expect(component.totalItems()).toBe(1);
  });

  describe('addToCart', () => {
    it('should call cartService.addItem with the product and quantity 1', () => {
      component.addToCart(mockProduct);

      expect(cartServiceMock.addItem).toHaveBeenCalledWith({
        product: mockProduct,
        quantity: 1,
      });
    });

    it('should show a toast notification with the product title', () => {
      component.addToCart(mockProduct);

      expect(toastServiceMock.info).toHaveBeenCalledWith(
        `'${mockProduct.title}' added to cart`,
      );
    });
  });

  describe('removeItem', () => {
    it('should call wishlistService.removeFromWishLIst with the given id', () => {
      component.removeItem(mockProduct.id);

      expect(wishlistServiceMock.removeFromWishLIst).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe('clearWishlist', () => {
    it('should call wishlistService.clearWishList', () => {
      component.clearWishlist();

      expect(wishlistServiceMock.clearWishList).toHaveBeenCalled();
    });
  });
});