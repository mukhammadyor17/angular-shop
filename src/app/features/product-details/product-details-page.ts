import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogService } from '../catalog/catalog.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-details-page',
  imports: [RouterLink],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
})
export class ProductDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);

  product = signal<Product | null>(null);
  activeImage = signal<string>('');
  quantity = signal(1);

  stars = computed(() => {
    const rating = parseFloat(String(this.product()?.rating ?? 0));
    const filled = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => i < filled);
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.catalogService.getProductBySlug(slug).subscribe((product) => {
      this.product.set(product);
      this.activeImage.set(product.images?.[0] ?? product.imageUrl);
    });
  }

  setImage(url: string): void {
    this.activeImage.set(url);
  }

  increment(): void {
    const max = this.product()?.stock ?? 99;
    if (this.quantity() < max) this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    if (this.quantity() > 1) this.quantity.update((q) => q - 1);
  }
}
