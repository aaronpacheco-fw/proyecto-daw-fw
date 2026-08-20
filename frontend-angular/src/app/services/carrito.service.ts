import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito, EstadoCarrito } from '../../../../../../Downloads/models-services-angular/src/app/models/carrito.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private baseUrl = 'http://localhost:8080/api/carritos';

  constructor(private http: HttpClient) {}

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
