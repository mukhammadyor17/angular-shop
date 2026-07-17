import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { WishlistItem } from './wishlist-item.interface';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private storageKey = 'wishlist';
  private auth = inject(AuthService);
  private router = inject(Router);

  wishlist = signal<WishlistItem[]>(this.loadWishList());

  totalItems = computed(() => this.wishlist().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist()));
    });
  }

  addToWishList(product: WishlistItem): boolean {
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
   this.wishlist.update((items) => 
    items.filter((item) => item.id !== productId));
  };

  isInWishList(productId: string): boolean {
    return this.wishlist().some((item) => item.id === productId);
  }

  clearWishList(): void {
    this.wishlist.set([]);
  }

  private loadWishList(): WishlistItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
