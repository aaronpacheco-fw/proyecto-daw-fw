import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito, EstadoCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';

type ProductoEnCarrito = Producto & { cantidad: number };

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private baseUrl = 'http://localhost:8080/api/carritos';

  constructor(private http: HttpClient) {}


  obtenerProductosLocal(): ProductoEnCarrito[] {
    const guardado = localStorage.getItem('productos_carrito');
    return guardado ? (JSON.parse(guardado) as ProductoEnCarrito[]) : [];
  }


  agregarProductoLocal(producto: Producto): void {
    const carritoActual = this.obtenerProductosLocal();
    const indice = carritoActual.findIndex((item: any) => item.id === producto.id);

    if (indice >= 0) {
      const cantidadActual = carritoActual[indice].cantidad || 1;
      const nuevaCantidad = cantidadActual + 1;
      const stockMaximo = carritoActual[indice].stock ?? producto.stock;

      if (stockMaximo > 0 && nuevaCantidad <= stockMaximo) {
        carritoActual[indice].cantidad = nuevaCantidad;
      }
    } else {
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('productos_carrito', JSON.stringify(carritoActual));
  }

  actualizarCantidadLocal(index: number, cantidad: number, stockMaximo: number): void {
    const carritoActual = this.obtenerProductosLocal();
    if (!carritoActual[index]) return;

    const cantidadSegura = Math.max(1, Math.min(Math.trunc(cantidad), stockMaximo));
    carritoActual[index].cantidad = cantidadSegura;
    localStorage.setItem('productos_carrito', JSON.stringify(carritoActual));
  }

  eliminarProductoLocal(index: number): void {
    const carritoActual = this.obtenerProductosLocal();
    carritoActual.splice(index, 1);
    localStorage.setItem('productos_carrito', JSON.stringify(carritoActual));
  }

  limpiarCarritoLocal(): void {
    localStorage.removeItem('productos_carrito');
  }

  calcularTotalLocal(): number {
    const carritoActual = this.obtenerProductosLocal();
    return carritoActual.reduce(
      (total, p: any) => total + p.precio * (p.cantidad || 1),
      0,
    );
  }


  listar(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.baseUrl);
  }

  crear(idUsuario: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.baseUrl}/${idUsuario}/crear`, {});
  }

  obtenerPorId(idCarrito: number): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.baseUrl}/${idCarrito}`);
  }

  obtenerPorUsuario(idUsuario: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  cambiarEstado(idCarrito: number, estado: EstadoCarrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.baseUrl}/${idCarrito}/estado`, null, {
      params: { estado },
    });
  }

  eliminar(idCarrito: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idCarrito}`);
  }
}
