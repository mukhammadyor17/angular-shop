import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule, MatCardModule, CurrencyPipe, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})

export class CartPage {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.cartItems;
  readonly total = this.cartService.total;

  increase(id: string) {this.cartService.increaseQuantity(id);}
  decrease(id: string) {this.cartService.decreaseQuantity(id);}

  removeFromCart(id: string): void {
    this.cartService.removeItem(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
