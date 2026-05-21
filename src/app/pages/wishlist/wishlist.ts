import { Component, computed, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
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
