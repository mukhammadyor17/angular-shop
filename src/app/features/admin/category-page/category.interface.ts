export interface Category {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: string;
  imageUrl: string;
  isActive: boolean;
  isDelete: boolean;
  name: string;
  slug: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}
