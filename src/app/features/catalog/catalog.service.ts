import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProducts() {
    return this.http
      .get<{ data: Product[] }>(`${this.apiUrl}/products`)
      .pipe(
        map(response => response.data)
      )
  }

  getProductBySlug(slug: string) {
    return this.http.
      get<Product>(`${this.apiUrl}/products/${slug}`);
  }

  getTopsales() {
    return this.http
      .get<{ data: Product[] }>(`${this.apiUrl}/products`, {
        params: { sortBy: 'rating', order: 'desc', limit: 4 }
      })
      .pipe(map(response => response.data))
  }
}
