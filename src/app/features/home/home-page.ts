import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CatalogService } from '../catalog/catalog.service';
import { CartService } from '../cart/cart.service';
import { ToastService } from '../../core/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);
  private readonly toast = inject(ToastService);

  products = signal<Product[]>([]);
  isLoading = signal(false);
  catalogServiceSubscription$!: Subscription;

  onAddToCart(product: Product): void {
    this.cartService.addItem({ product, quantity: 1 });
    this.toast.success(`"${product.title}" added to cart`);
  }

  ngOnInit(): void {
    this.isLoading.set(true);

    this.catalogServiceSubscription$ = this.catalogService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('PRODUCTS ERROR:', err);
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.catalogServiceSubscription$.unsubscribe();
  }
}
