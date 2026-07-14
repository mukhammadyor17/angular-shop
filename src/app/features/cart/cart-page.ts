import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CartService } from './cart.service';
import { ToastService } from '../../core/toast/toast.service';
import { FormatPricePipe } from '../../shared/pipes/format-price-pipe';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatIcon, FormatPricePipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private readonly cartService = inject(CartService);
  private readonly toast = inject(ToastService);

  readonly items = this.cartService.cartItems;
  readonly total = this.cartService.total;

  increaseQuantity(product: Product): void {
    this.cartService.addItem({ product, quantity: 1 });
  }

  decreaseQuantity(id: string): void {
    this.cartService.decreaseQuantity(id);
  }

  removeItem(id: string, title: string): void {
    this.cartService.removeItem(id);
    this.toast.info(`"${title}" removed from cart`);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.toast.info('Cart cleared');
  }
}
