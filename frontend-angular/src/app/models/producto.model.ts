import { Categoria } from './categoria.model';


export interface Producto {
  id?: number;
  nombre: string;
  marca: string;
  categoria: Categoria;
  precio: number;
  stock: number;
  talla: string;
  estado: string;
  imagen?: string;
}


export interface ProductoRequest {
  nombre: string;
  marca: string;
  categoriaId: number;
  precio: number;
  stock: number;
  talla: string;
  estado: string;
  imagen?: string;
}
