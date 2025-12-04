export interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  category?: string; // opcional si lo usas
  // agrega más propiedades según necesites
}