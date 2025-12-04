export interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  category?: string; 
}