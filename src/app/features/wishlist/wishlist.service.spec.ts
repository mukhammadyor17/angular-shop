import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { WishlistService } from './wishlist.service';
import { AuthService } from '../../core/auth/auth.service';
import { Product } from '../../shared/models/product.model';

describe('WishlistService', () => {
  let service: WishlistService;
  let authServiceMock: { isAuthenticated: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn>; url: string };
  let appRef: ApplicationRef;

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

  const mockProduct2: Product = {
    ...mockProduct,
    id: '2',
    title: 'Second Product',
    slug: 'second-product',
  };

  beforeEach(() => {
    localStorage.clear();

    authServiceMock = { isAuthenticated: vi.fn() };
    routerMock = { navigate: vi.fn(), url: '/wishlist' };

    TestBed.configureTestingModule({
      providers: [
        WishlistService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    appRef = TestBed.inject(ApplicationRef);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created with an empty wishlist when localStorage is empty', () => {
    service = TestBed.inject(WishlistService);
    expect(service.wishlist()).toEqual([]);
    expect(service.totalItems()).toBe(0);
  });

  it('should load existing wishlist from localStorage on init', () => {
    localStorage.setItem('wishlist', JSON.stringify([mockProduct]));

    service = TestBed.inject(WishlistService);

    expect(service.wishlist()).toEqual([mockProduct]);
    expect(service.totalItems()).toBe(1);
  });

  describe('addToWishList', () => {
    it('should redirect to login and return false when not authenticated', () => {
      authServiceMock.isAuthenticated.mockReturnValue(false);
      service = TestBed.inject(WishlistService);

      const result = service.addToWishList(mockProduct);

      expect(result).toBe(false);
      expect(service.wishlist()).toEqual([]);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { redirect: '/wishlist' },
      });
    });

    it('should add product and return true when authenticated', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);

      const result = service.addToWishList(mockProduct);

      expect(result).toBe(true);
      expect(service.wishlist()).toEqual([mockProduct]);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should not add a duplicate product', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);

      service.addToWishList(mockProduct);
      const result = service.addToWishList(mockProduct);

      expect(result).toBe(true);
      expect(service.wishlist().length).toBe(1);
    });
  });

  describe('removeFromWishLIst', () => {
    it('should remove product by id', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);
      service.addToWishList(mockProduct);
      service.addToWishList(mockProduct2);

      service.removeFromWishLIst(mockProduct.id);

      expect(service.wishlist()).toEqual([mockProduct2]);
    });

    it('should do nothing if product id does not exist', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);
      service.addToWishList(mockProduct);

      service.removeFromWishLIst('non-existing-id');

      expect(service.wishlist()).toEqual([mockProduct]);
    });
  });

  describe('isInWishList', () => {
    it('should return true if product is in wishlist', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);
      service.addToWishList(mockProduct);

      expect(service.isInWishList(mockProduct.id)).toBe(true);
    });

    it('should return false if product is not in wishlist', () => {
      service = TestBed.inject(WishlistService);

      expect(service.isInWishList('non-existing-id')).toBe(false);
    });
  });

  describe('clearWishList', () => {
    it('should empty the wishlist', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);
      service.addToWishList(mockProduct);
      service.addToWishList(mockProduct2);

      service.clearWishList();

      expect(service.wishlist()).toEqual([]);
      expect(service.totalItems()).toBe(0);
    });
  });

  describe('localStorage persistence', () => {
    it('should persist wishlist to localStorage when it changes', () => {
      authServiceMock.isAuthenticated.mockReturnValue(true);
      service = TestBed.inject(WishlistService);

      service.addToWishList(mockProduct);
      appRef.tick(); // flush the effect synchronously

      const stored = JSON.parse(localStorage.getItem('wishlist')!);
      expect(stored).toEqual([mockProduct]);
    });
  });
});