import { Component } from '@angular/core';
import { ProductCard, ProductCardData } from '../../components/base/product-card/product-card';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPage {
  product = {
    name: 'Gradient Graphic T-shirt',
    imageUrl: 'assets/images/product-tshirt.png',
    rating: 3.5,
    price: 145,
    oldPrice: null,
    discount: null,
  };

  onAddToCart(product: ProductCardData): void {
    console.log('Add to cart:', product);
  }
}
