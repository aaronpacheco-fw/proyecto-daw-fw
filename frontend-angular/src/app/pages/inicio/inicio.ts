import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  productosDestacados: Producto[] = [];

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.productosDestacados = data.filter((p) => p.estado === 'DISPONIBLE').slice(0, 4);
        } else {
          this.getProductosRespaldo();
        }
        this.cdr.detectChanges();
      },
      error: () => {

        this.getProductosRespaldo();
        this.cdr.detectChanges();
      },
    });
  }

  getProductosRespaldo(): void {
    this.productosDestacados = [
      {
        id: 1,
        nombre: 'Polo',
        marca: 'Four Ways',
        precio: 39.9,
        stock: 15,
        estado: 'DISPONIBLE',
        imagen: 'assets/img/polo1.png',
      },
      {
        id: 2,
        nombre: 'Chaqueta',
        marca: 'Four Ways',
        precio: 129.9,
        stock: 10,
        estado: 'DISPONIBLE',
        imagen: 'assets/img/chaqueta1.png',
      },
      {
        id: 3,
        nombre: 'Camisa',
        marca: 'Four Ways',
        precio: 149.9,
        stock: 8,
        estado: 'DISPONIBLE',
        imagen: 'assets/img/camisa1.png',
      },
      {
        id: 4,
        nombre: 'Jean',
        marca: 'Four Ways',
        precio: 119.9,
        stock: 5,
        estado: 'DISPONIBLE',
        imagen: 'assets/img/jean1.png',
      },
    ] as any;
    this.cdr.detectChanges();
  }

  irAlCatalogo(): void {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/catalogo']);
    });
  }
}
