import { Product } from "./product.interface";

export interface Category {
  id: string;
  name: string;
  products: Omit<Product, "category">[];
}
