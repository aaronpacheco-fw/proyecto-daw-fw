import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  items: any[] = [];

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    const productos = this.carritoService.obtenerProductosLocal();
    this.items = productos.map((p: any, index: number) => ({
      id: index,
      producto: p,
      cantidad: p.cantidad || 1,
    }));
  }

  calcularTotal(): number {
    return this.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  actualizarCantidad(item: any): void {
    // Lógica opcional para actualizar cantidad
  }

  eliminarItem(id: number): void {
    this.carritoService.eliminarProductoLocal(id);
    this.cargarCarrito();
  }

  // Aquí puedes redirigir al componente de checkout cuando lo creemos
  realizarCompra(): void {
    if (this.items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
