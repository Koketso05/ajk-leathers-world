export interface IProduct {
  id: number;
  $key?: string;
  title: string;
  imageUrl: string;
  type: string;
  category?: string;
  price: string;
  description?: string;
}
