import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateCategoryPayload, Category } from './category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(payload: CreateCategoryPayload) {
    return this.http.post(`${this.baseUrl}/categories`, payload);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.baseUrl}/categories/${categoryId}`);
  }
}
