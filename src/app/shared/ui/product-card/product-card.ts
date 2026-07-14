import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { FormatPricePipe } from '../../pipes/format-price-pipe';
import { MatIcon } from '@angular/material/icon';
import { WishlistService } from '../../../features/wishlist/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormatPricePipe, 
    NgOptimizedImage, 
    RouterLink,
    MatIcon,
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private readonly wishlistService = inject(WishlistService);
  product = input.required<Product>();
  priority = input(false);

  readonly isInWishlist = computed(() => 
    this.wishlistService
      .wishlist()
      .some(item => item.id === this.product().id)
)
  
  addToCart = output<Product>();

   onToggleWishlist(): void {
    const product = this.product();

    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishLIst(product.id);
      return;
    }

    this.wishlistService.addToWishList({
      id: product.id,
      name: product.title,
      image: product.imageUrl,
      price: product.price,
    });
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
