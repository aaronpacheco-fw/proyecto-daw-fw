import { Usuario } from './usuario.model';

export type EstadoCarrito = 'ACTIVO' | 'FINALIZADO' | 'ABANDONADO';

export interface Carrito {
  id?: number;
  usuario: Usuario;
  fechaCreacion?: string;
  fechaModificacion?: string;
  estado: EstadoCarrito;
}
