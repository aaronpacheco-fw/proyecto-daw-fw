import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCarrito, ItemCarritoRequest } from '../models/item-carrito.model';

@Injectable({ providedIn: 'root' })
export class ItemCarritoService {
  private baseUrl = 'http://localhost:8080/api/items-carrito';

  constructor(private http: HttpClient) {}

  agregar(idCarrito: number, item: ItemCarritoRequest): Observable<ItemCarrito> {
    return this.http.post<ItemCarrito>(`${this.baseUrl}/carrito/${idCarrito}`, item);
  }

  listarPorCarrito(idCarrito: number): Observable<ItemCarrito[]> {
    return this.http.get<ItemCarrito[]>(`${this.baseUrl}/carrito/${idCarrito}`);
  }

  obtenerPorId(id: number): Observable<ItemCarrito> {
    return this.http.get<ItemCarrito>(`${this.baseUrl}/${id}`);
  }

  actualizarCantidad(id: number, cantidad: number): Observable<ItemCarrito> {
    return this.http.put<ItemCarrito>(`${this.baseUrl}/${id}/cantidad`, null, {
      params: { cantidad },
    });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
