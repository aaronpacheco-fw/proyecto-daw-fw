import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);
  private carritoService = inject(CarritoService);
  private router = inject(Router);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];

  cargando = false;
  error = '';
  textoBusqueda = '';
  categoriaSeleccionada: number | null = null;

  constructor() {

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.router.url.includes('/catalogo')) {
        this.cargarProductos();
      }
    });
  }

  ngOnInit(): void {
    this.categoriaSeleccionada = null;
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productoService.listar().subscribe({
      next: (data) => {
        console.log('MIRA LO QUE LLEGA DEL BACKEND:', data);
        this.productos = data.filter((p) => p.estado === 'DISPONIBLE' && p.stock > 0);
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: () => {

        this.error = 'No se pudieron cargar los productos del servidor.';
        this.productos = [
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
        this.aplicarFiltros();
        this.cargando = false;
      },
    });
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.categorias = data;
        } else {
          this.getCategoriasRespaldo();
        }
      },
      error: () => {

        console.error('Error al cargar categorías del servidor, usando respaldo.');
        this.getCategoriasRespaldo();
      },
    });
  }

  // Método de respaldo para que las categorías nunca se queden vacías
  getCategoriasRespaldo(): void {
    this.categorias = [
      { id: 1, nombre: 'Polos' },
      { id: 2, nombre: 'Chaquetas' },
      { id: 3, nombre: 'Camisas' },
      { id: 4, nombre: 'Jeans' },
    ] as any;
  }

  aplicarFiltros(): void {
    let resultado = this.productos;

    if (this.textoBusqueda.trim()) {
      const texto = this.textoBusqueda.trim().toLowerCase();
      resultado = resultado.filter(
        (p) => p.nombre.toLowerCase().includes(texto) || p.marca.toLowerCase().includes(texto),
      );
    }

    if (this.categoriaSeleccionada !== null && this.categoriaSeleccionada !== undefined) {
      resultado = resultado.filter((p) => p.categoria?.id === Number(this.categoriaSeleccionada));
    }

    this.productosFiltrados = resultado;
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProductoLocal(producto);
  }
}
