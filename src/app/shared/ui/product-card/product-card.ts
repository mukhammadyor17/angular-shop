import { Component, input, output } from '@angular/core';

export interface ProductCardData {
  name: string;
  imageUrl: string;
  rating: number;
  price: number;
  oldPrice: number | null;
  discount: string | null;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<ProductCardData>()

  addToCart = output<ProductCardData>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
