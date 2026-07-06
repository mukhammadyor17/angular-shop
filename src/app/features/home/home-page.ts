import { Component, computed, inject } from '@angular/core';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../catalog/catalog.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../cart/cart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly cartService = inject(CartService);
  private readonly catalogService = inject(CatalogService);

  private readonly products = toSignal(
    this.catalogService.getProducts(),
    { initialValue: [] }
  );

  readonly newArrivals = computed(() => this.products().slice(0, 4));
  readonly topSales = toSignal(
    this.catalogService.getTopsales(),
    { initialValue: [] }
  );

  onAddToCart(product: Product): void {
    this.cartService.addItem({ product, quantity: 1 })
  }
}
