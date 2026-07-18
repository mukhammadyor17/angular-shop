import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CatalogService } from '../../catalog/catalog.service';
import { CategoryService } from '../category-page/category.service';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../category-page/category.interface';

@Component({
  selector: 'app-product-page',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly categoryService = inject(CategoryService);
  private readonly fb = inject(FormBuilder);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  showForm = signal(false);
  confirmDeleteId = signal<string | null>(null);

  displayedColumns = [
    'index',
    'title',
    'category',
    'price',
    'stock',
    'status',
    'createdAt',
    'actions',
  ];

  form = this.fb.group({
    title: ['', Validators.required],
    slug: [{ value: '', disabled: true }],
    description: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    oldPrice: [null as number | null],
    imageUrl: [''],
    stock: [0, Validators.min(0)],
    categoryId: ['', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    this.form.controls.title.valueChanges.subscribe((title) => {
      const slug = (title ?? '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      this.form.controls.slug.setValue(slug, { emitEvent: false });
    });
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.catalogService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => this.categories.set(data));
  }

  openForm(): void {
    this.form.reset({ isActive: true, stock: 0 });
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
  }

  onCreate(): void {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);
    const { title, description, price, oldPrice, imageUrl, stock, categoryId, isActive } =
      this.form.value;
    const payload = {
      title: title!,
      slug: this.form.controls.slug.value!,
      description: description!,
      price: price!,
      ...(oldPrice ? { oldPrice } : {}),
      ...(imageUrl ? { imageUrl } : {}),
      stock: stock ?? 0,
      categoryId: categoryId!,
      isActive: isActive ?? true,
    };
    this.catalogService.createProduct(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.showForm.set(false);
        this.loadProducts();
      },
      error: () => this.isSubmitting.set(false),
    });
  }

  confirmDelete(id: string): void {
    this.confirmDeleteId.set(id);
  }
  cancelDelete(): void {
    this.confirmDeleteId.set(null);
  }

  onDelete(id: string): void {
    this.catalogService.deleteProduct(id).subscribe({
      next: () => {
        this.confirmDeleteId.set(null);
        this.loadProducts();
      },
    });
  }

  getCategoryName(product: Product): string {
    return product.category?.title ?? '—';
  }
}
