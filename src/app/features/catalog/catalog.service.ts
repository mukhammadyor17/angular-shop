import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { map } from 'rxjs';
import { API_URL } from '../../core/tokens/api-url.token';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  getProducts() {
    return this.http
      .get<{ data: Product[] }>(`${this.apiUrl}/products`)
      .pipe(map((response) => response.data));
  }

  getProductBySlug(slug: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${slug}`);
  }

  createProduct(payload: Partial<Product> & { categoryId: string }) {
    return this.http.post<Product>(`${this.apiUrl}/products`, payload);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getTopsales() {
    return this.http
      .get<{ data: Product[] }>(`${this.apiUrl}/products`, {
        params: { sortBy: 'rating', order: 'desc', limit: 4 }
      })
      .pipe(map(response => response.data))
  }
}
