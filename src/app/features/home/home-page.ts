import { Component } from '@angular/core';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  product: Product = {
    id: 'string',
    title: 'Gradient Graphic T-shirt',
    imageUrl: 'images/gradient-graphic-tshirt.png',
    slug: 'test',
    rating: 3.5,
    price: 145,
    oldPrice: null,
    discount: null,
  };
}
