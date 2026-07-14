export interface ProductCategory {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  rating: number;
  price: number;
  oldPrice: number | string | null;
  discount: number | null;
  description?: string;
  images?: string[];
  stock?: number;
  isActive?: boolean;
  category?: ProductCategory;
  variants?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}
