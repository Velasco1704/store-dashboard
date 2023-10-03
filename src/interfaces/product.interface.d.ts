import { Category } from "./category.interface";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: Omit<Category, "products">;
}
