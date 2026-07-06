export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  rating: string;
  price: string;
  oldPrice: number | null;
  discount: number | null;  
  description?: string;
}
