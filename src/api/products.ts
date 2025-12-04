  import type { Producto } from "../interfaces/Producto";
  import { api } from "./client";

  export const getProducts = async (): Promise<Producto[]> => {
    const res = await api.get<Producto[]>("/productos");
    return res.data;
  };

  export const getProductById = async (id: number): Promise<Producto> => {
    const res = await api.get<Producto>(`/productos/${id}`);
    return res.data;
  };

  export const getProductsByCategory = async (category: string): Promise<Producto[]> => {
    const res = await api.get<Producto[]>(`/productos/categoria/${category}`);
    return res.data;
  };

  export const searchProducts = async (title: string): Promise<Producto[]> => {
    const res = await api.get<Producto[]>(`/productos/buscar?titulo=${title}`);
    return res.data;
  };