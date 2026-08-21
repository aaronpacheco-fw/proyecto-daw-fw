import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { ItemCarritoService } from '../../services/item-carrito.service';
import { Carrito, EstadoCarrito } from '../../models/carrito.model';
import { ItemCarrito } from '../../models/item-carrito.model';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras implements OnInit {
  compras: Carrito[] = [];
  cargando = true;
  error = '';
  exito = '';

  estados: EstadoCarrito[] = ['ACTIVO', 'FINALIZADO', 'ABANDONADO'];

  compraExpandidaId: number | null = null;
  itemsDeCompra: ItemCarrito[] = [];
  cargandoItems = false;
  totalCompra = 0;

  constructor(
    private carritoService: CarritoService,
    private itemCarritoService: ItemCarritoService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.carritoService.listar().subscribe({
      next: (data) => {
        this.compras = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de compras.';
        this.cargando = false;
      },
    });
  }

  verDetalle(compra: Carrito): void {
    if (!compra.id) return;

    if (this.compraExpandidaId === compra.id) {
      this.compraExpandidaId = null;
      return;
    }

    this.compraExpandidaId = compra.id;
    this.cargandoItems = true;
    this.itemsDeCompra = [];
    this.totalCompra = 0;

    this.itemCarritoService.listarPorCarrito(compra.id).subscribe({
      next: (items) => {
        this.itemsDeCompra = items;
        this.totalCompra = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0);
        this.cargandoItems = false;
      },
      error: () => {
        this.itemsDeCompra = [];
        this.cargandoItems = false;
      },
    });
  }

  cambiarEstado(compra: Carrito, estado: EstadoCarrito): void {
    if (!compra.id) return;

    this.carritoService.cambiarEstado(compra.id, estado).subscribe({
      next: () => {
        this.exito = `Compra #${compra.id} actualizada a ${estado}.`;
        this.cargar();
        setTimeout(() => (this.exito = ''), 3000);
      },
      error: () => (this.error = 'No se pudo cambiar el estado de la compra.'),
    });
  }

  eliminar(compra: Carrito): void {
    if (!compra.id) return;
    if (!confirm(`¿Eliminar la compra #${compra.id}? Esta acción no se puede deshacer.`)) return;

    this.carritoService.eliminar(compra.id).subscribe({
      next: () => {
        this.exito = `Compra #${compra.id} eliminada.`;
        this.compraExpandidaId = null;
        this.cargar();
        setTimeout(() => (this.exito = ''), 3000);
      },
      error: () => (this.error = 'No se pudo eliminar la compra.'),
    });
  }
}
