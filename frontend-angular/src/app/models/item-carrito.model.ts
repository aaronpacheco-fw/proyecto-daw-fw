import { Carrito } from './carrito.model';
import { Producto } from './producto.model';

// Forma en la que el backend devuelve un item (GET)
export interface ItemCarrito {
  id?: number;
  carrito: Carrito;
  producto: Producto;
  cantidad: number;
}

// Body que espera el backend en POST /api/items-carrito/carrito/{idCarrito}
export interface ItemCarritoRequest {
  productoId: number;
  cantidad: number;
}
