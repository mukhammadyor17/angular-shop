import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { Product } from '../../shared/models/product.model';

/** state place in a signal and is persisted to localStorage, 
 * so it survives page refreshes without a backend
 */

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private storageKey = 'wishlist';
  private auth = inject(AuthService);
  private router = inject(Router);

  wishlist = signal<Product[]>(this.loadWishList());

  totalItems = computed(() => this.wishlist().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist()));
    });
  }

  addToWishList(product: Product): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
      return false;
    }

    const exist = this.wishlist().some((item) => item.id === product.id);
    if (exist) return true;

    this.wishlist.update((items) => [...items, product]);
    return true;
  }

  removeFromWishLIst(productId: string): void {
      this.wishlist.update((items) => items.filter((item) => item.id !== productId));
  }

  isInWishList(productId: string): boolean {
    return this.wishlist().some((item) => item.id === productId);
  }

  clearWishList(): void {
    this.wishlist.set([]);
  }

  private loadWishList(): Product[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
