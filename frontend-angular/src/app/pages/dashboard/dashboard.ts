import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    forkJoin({
      productos: this.productoService.listar(),
      usuarios: this.usuarioService.listar(),
      carritos: this.carritoService.listar(),
    }).subscribe({
      next: ({ productos, usuarios, carritos }) => {
        this.totalProductos = productos.length;
        this.totalTrabajadores = usuarios.length;
        this.comprasActivas = carritos.filter((c) => c.estado === 'ACTIVO').length;
        this.productosStockBajo = productos
          .filter((p) => p.stock < STOCK_BAJO_LIMITE)
          .sort((a, b) => a.stock - b.stock);
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información del panel. Verifica que el backend esté activo.';
        this.cargando = false;
      },
    });
  }
}
