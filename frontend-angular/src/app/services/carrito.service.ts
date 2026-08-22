import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito, EstadoCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private baseUrl = 'http://localhost:8080/api/carritos';

  constructor(private http: HttpClient) {}


  obtenerProductosLocal(): Producto[] {
    const guardado = localStorage.getItem('productos_carrito');
    return guardado ? JSON.parse(guardado) : [];
  }


  agregarProductoLocal(producto: Producto): void {
    const carritoActual = this.obtenerProductosLocal();
    carritoActual.push(producto);
    localStorage.setItem('productos_carrito', JSON.stringify(carritoActual));
    console.log('Productos actualizados en el carrito:', carritoActual);
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
    return carritoActual.reduce((total, p) => total + p.precio, 0);
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
