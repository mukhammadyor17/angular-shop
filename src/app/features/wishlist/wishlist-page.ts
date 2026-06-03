import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  imports: [RouterLink],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage {
  private wishlistService = inject(WishlistService);

  wishlistItems = this.wishlistService.wishlist;

  totalItems = computed(() => this.wishlistItems().length);

  removeItem(id: string): void {
    this.wishlistService.removeFromWishLIst(id);
  }

  clearWishlist(): void {
    this.wishlistService.clearWishList();
  }
}
