import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../cart/cart.service';
import { CatalogService } from './catalog.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [ProductCard, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.scss',
})
export class CatalogPage implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.catalogService.getProducts().subscribe({
      next: (response) => {
        console.log('PRODUCTS RESPONSE:', response);

        this.products.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('PRODUCTS ERROR:', err);
        this.error.set('Failed to load products');
        this.isLoading.set(false);
      },
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addItem({
      product,
      quantity: 1,
    });
  }
}
