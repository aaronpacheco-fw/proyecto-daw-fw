import { Producto } from './producto.model';

// Forma en la que el backend devuelve un item (GET).
// Nota: "carrito" no viaja en el JSON porque la entidad lo marca @JsonIgnore.
export interface ItemCarrito {
  id?: number;
  productoId: number;
  producto?: Producto;
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
}

// Body que espera el backend en POST /api/items-carrito/carrito/{idCarrito}
export interface ItemCarritoRequest {
  productoId: number;
  cantidad: number;
}
