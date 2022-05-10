export interface Filter {
  page?: number;
  color?: string;
  maxPrice?: number;
  minPrice?: number;
  brand?: string;
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
