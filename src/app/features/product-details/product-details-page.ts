import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';
import { CatalogService } from '../catalog/catalog.service';
import { CartService } from '../cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-details-page',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
})

export class ProductDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);

  readonly product = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug')!),
      switchMap(slug => this.catalogService.getProductBySlug(slug))
    )
  );
  
  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.addItem({ product, quantity: 1})
    }
  }
}
