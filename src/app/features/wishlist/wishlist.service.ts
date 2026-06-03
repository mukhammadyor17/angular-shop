import { computed, effect, Injectable, signal } from '@angular/core';
import { WishlistItem } from './wishlist-item.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private storageKey = 'wishlist';
  //when app starts data from browser storage is loaded & signal get this data
  wishlist = signal<WishlistItem[]>(this.loadWishList());

  totalItems = computed(() => this.wishlist().length) 

  constructor() {
    /* automatically synchronize state with localStorage */
    effect(() => {
      localStorage.setItem(this.storageKey, 
      JSON.stringify(this.wishlist()))
    });
  };

  addToWishList(product: WishlistItem): void {
    /* will prevent duplicates */
    const exist = this.wishlist().some((item) => item.id === product.id);
    if (exist) return;
    this.wishlist.update((items) => [...items, product]);
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
