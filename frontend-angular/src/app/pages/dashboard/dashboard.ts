import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

const STOCK_BAJO_LIMITE = 10;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  cargando = true;
  error = '';

  totalProductos = 0;
  totalTrabajadores = 0;
  comprasActivas = 0;
  productosStockBajo: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private carritoService: CarritoService,
  ) {}

  ngOnInit(): void {

    this.productoService
      .listar()
      .pipe(catchError(() => of([])))
      .subscribe({
        next: (productos: any) => {
          this.totalProductos = productos.length;
          this.productosStockBajo = productos
            .filter((p: any) => p.stock < STOCK_BAJO_LIMITE)
            .sort((a: any, b: any) => a.stock - b.stock);
        },
      });

    this.usuarioService
      .listar()
      .pipe(catchError(() => of([])))
      .subscribe({
        next: (usuarios: any) => {
          this.totalTrabajadores = usuarios.length;
        },
      });


    const comprasLocales = JSON.parse(localStorage.getItem('mis_compras') || '[]');
    this.comprasActivas = comprasLocales.length;


    this.cargando = false;
  }
}
