import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WishlistService } from './wishlist.service';
import { CartService } from '../cart/cart.service';
import { ToastService } from '../../core/toast/toast.service';
import { Product } from '../../shared/models/product.model';

/** displays user's saved products and lets them move items to the cart.
 * all wishlist state lives in WishlistService; 
 * this component only renders it and forwards user actions.
 */

@Component({
  selector: 'app-wishlist-page',
  imports: [RouterLink],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage {
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);
  private toast = inject(ToastService);

  wishlistItems = this.wishlistService.wishlist;

  totalItems = computed(() => this.wishlistItems().length);

  addToCart(product: Product): void {
    this.cartService.addItem({ product, quantity: 1 });
    this.toast.info(`'${product.title}' added to cart`);
  }

  removeItem(id: string): void {
    this.wishlistService.removeFromWishLIst(id);
  }

  clearWishlist(): void {
    this.wishlistService.clearWishList();
  }
}
