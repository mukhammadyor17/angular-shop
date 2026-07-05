import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product.model';
import { FormatPricePipe } from '../../pipes/format-price-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormatPricePipe, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();

  addToCart = output<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
