import { Category } from "./category-interface";

export interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  price: number;
  categories: Category[];
}

