import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto, ProductoRequest } from '../../models/producto.model';

const STOCK_BAJO_LIMITE = 10;

type FiltroStock = 'TODOS' | 'BAJO';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './almacen.html',
  styleUrl: './almacen.css',
})
export class Almacen implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  cargando = true;
  error = '';
  exito = '';

  filtro: FiltroStock = 'TODOS';
  stockBajoLimite = STOCK_BAJO_LIMITE;

  edicionId: number | null = null;
  nuevoStock = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.aplicarFiltro();
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el inventario.';
        this.cargando = false;
      },
    });
  }

  aplicarFiltro(): void {
    this.productosFiltrados =
      this.filtro === 'BAJO'
        ? this.productos.filter((p) => p.stock < STOCK_BAJO_LIMITE)
        : this.productos;
  }

  cambiarFiltro(filtro: FiltroStock): void {
    this.filtro = filtro;
    this.aplicarFiltro();
  }

  editarStock(producto: Producto): void {
    this.edicionId = producto.id ?? null;
    this.nuevoStock = producto.stock;
  }

  cancelarEdicion(): void {
    this.edicionId = null;
  }

  guardarStock(producto: Producto): void {
    if (!producto.id) return;

    const request: ProductoRequest = {
      nombre: producto.nombre,
      marca: producto.marca,
      categoriaId: producto.categoria.id!,
      precio: producto.precio,
      stock: this.nuevoStock,
      talla: producto.talla,
      estado: producto.estado,
    };

    this.productoService.actualizar(producto.id, request).subscribe({
      next: () => {
        this.exito = `Stock de "${producto.nombre}" actualizado.`;
        this.edicionId = null;
        this.cargar();
        setTimeout(() => (this.exito = ''), 3000);
      },
      error: () => (this.error = 'No se pudo actualizar el stock.'),
    });
  }
}
