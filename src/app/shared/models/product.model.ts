export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  rating: number;
  price: number;
  oldPrice: number | null;
  discount: number | null;  
}
