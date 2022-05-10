export type CategoryTreeNode = {
  parent: Category;
  children: Category[] | null;
};

export interface Filter {
  page?: number;
  color?: Color;
  maxPrice?: number;
  minPrice?: number;
  brand?: Brand;
  categoryId?: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  category_id: number;
  brand: string;
  color: string;
  original_price: number;
  sales_price: number;
  retailer_id: number;
}

export interface Category {
  id: number;
  parent_id: number;
  name: string;
}

export interface Brand {
  name: string;
}

export interface Color {
  name: string;
}
