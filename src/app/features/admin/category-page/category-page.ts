import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from './category.service';
import { Category } from './category.interface';

@Component({
  selector: 'app-category-page',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly fb = inject(FormBuilder);

  categories = signal<Category[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  showForm = signal(false);
  confirmDeleteId = signal<string | null>(null);

  displayedColumns = ['index', 'name', 'slug', 'status', 'createdAt', 'actions'];

  form = this.fb.group({
    name: ['', Validators.required],
    slug: [{ value: '', disabled: true }],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    this.form.controls.name.valueChanges.subscribe((name) => {
      const slug = (name ?? '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      this.form.controls.slug.setValue(slug, { emitEvent: false });
    });
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  openForm(): void {
    this.form.reset({ isActive: true });
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
  }

  onCreate(): void {
    if (this.form.invalid) return;
    this.isSubmitting.set(true);
    const payload = {
      name: this.form.value.name!,
      slug: this.form.controls.slug.value!,
      description: this.form.value.description!,
      imageUrl: this.form.value.imageUrl!,
      isActive: this.form.value.isActive ?? true,
    };
    this.categoryService.createCategory(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.showForm.set(false);
        this.loadCategories();
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
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.confirmDeleteId.set(null);
        this.loadCategories();
      },
    });
  }
}
