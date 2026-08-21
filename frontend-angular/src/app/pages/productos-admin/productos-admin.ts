import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Producto, ProductoRequest } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';

interface ProductoForm {
  id?: number;
  nombre: string;
  marca: string;
  categoriaId: number | null;
  precio: number;
  stock: number;
  talla: string;
  estado: string;
}

@Component({
  selector: 'app-productos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-admin.html',
  styleUrl: './productos-admin.css',
})
export class ProductosAdmin implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = [];
  cargando = true;
  error = '';
  exito = '';
  textoBusqueda = '';

  mostrarFormulario = false;
  editando = false;
  form: ProductoForm = this.formVacio();

  estados = ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.categoriaService.listar().subscribe({
      next: (data) => (this.categorias = data),
      error: () => (this.error = 'No se pudieron cargar las categorías.'),
    });
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
        this.error = 'No se pudo cargar la lista de productos.';
        this.cargando = false;
      },
    });
  }

  aplicarFiltro(): void {
    const texto = this.textoBusqueda.trim().toLowerCase();
    this.productosFiltrados = !texto
      ? this.productos
      : this.productos.filter((p) => p.nombre.toLowerCase().includes(texto));
  }

  formVacio(): ProductoForm {
    return {
      nombre: '',
      marca: '',
      categoriaId: this.categorias[0]?.id ?? null,
      precio: 0,
      stock: 0,
      talla: '',
      estado: 'DISPONIBLE',
    };
  }

  nuevoProducto(): void {
    this.form = this.formVacio();
    this.editando = false;
    this.mostrarFormulario = true;
    this.error = '';
  }

  editar(producto: Producto): void {
    this.form = {
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      categoriaId: producto.categoria?.id ?? null,
      precio: producto.precio,
      stock: producto.stock,
      talla: producto.talla,
      estado: producto.estado,
    };
    this.editando = true;
    this.mostrarFormulario = true;
    this.error = '';
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.form = this.formVacio();
  }

  guardar(): void {
    this.error = '';

    if (!this.form.nombre || !this.form.marca || !this.form.categoriaId || !this.form.talla) {
      this.error = 'Completa nombre, marca, categoría y talla.';
      return;
    }

    const request: ProductoRequest = {
      nombre: this.form.nombre,
      marca: this.form.marca,
      categoriaId: this.form.categoriaId,
      precio: this.form.precio,
      stock: this.form.stock,
      talla: this.form.talla,
      estado: this.form.estado,
    };

    if (this.editando && this.form.id) {
      this.productoService.actualizar(this.form.id, request).subscribe({
        next: () => this.finalizarGuardado('Producto actualizado correctamente.'),
        error: () => (this.error = 'No se pudo actualizar el producto.'),
      });
    } else {
      this.productoService.crear(request).subscribe({
        next: () => this.finalizarGuardado('Producto creado correctamente.'),
        error: () => (this.error = 'No se pudo crear el producto.'),
      });
    }
  }

  private finalizarGuardado(mensaje: string): void {
    this.exito = mensaje;
    this.mostrarFormulario = false;
    this.cargar();
    setTimeout(() => (this.exito = ''), 3000);
  }

  eliminar(producto: Producto): void {
    if (!producto.id) return;
    if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)) return;

    this.productoService.eliminar(producto.id).subscribe({
      next: () => this.finalizarGuardado('Producto eliminado.'),
      error: () => (this.error = 'No se pudo eliminar el producto.'),
    });
  }
}
