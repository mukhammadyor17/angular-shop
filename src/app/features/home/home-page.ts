import { Component } from '@angular/core';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  product = {
    name: 'Gradient Graphic T-shirt',
    imageUrl: 'images/gradient-graphic-tshirt.png',
    rating: 3.5,
    price: 145,
    oldPrice: null,
    discount: null,
  };
}
