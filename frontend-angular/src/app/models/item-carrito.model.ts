import { Producto } from './producto.model';


export interface ItemCarrito {
  id?: number;
  productoId: number;
  producto?: Producto;
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
}

export interface ItemCarritoRequest {
  productoId: number;
  cantidad: number;
}
