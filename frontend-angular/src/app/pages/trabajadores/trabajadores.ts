import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css',
})
export class Trabajadores implements OnInit {
  trabajadores: Usuario[] = [];
  cargando = true;
  error = '';
  exito = '';

  mostrarFormulario = false;
  editando = false;
  form: Usuario = this.formVacio();

  roles = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'CLIENTE'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.trabajadores = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de trabajadores.';
        this.cargando = false;
      },
    });
  }

  formVacio(): Usuario {
    return { username: '', password: '', nombre: '', rol: 'VENDEDOR' };
  }

  nuevoTrabajador(): void {
    this.form = this.formVacio();
    this.editando = false;
    this.mostrarFormulario = true;
    this.error = '';
  }

  editar(trabajador: Usuario): void {
    this.form = { ...trabajador, password: '' };
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

    if (!this.form.username || !this.form.nombre || !this.form.rol) {
      this.error = 'Completa usuario, nombre y rol.';
      return;
    }

    if (!this.editando && !this.form.password) {
      this.error = 'La clave es obligatoria para un trabajador nuevo.';
      return;
    }

    if (this.editando && this.form.idUsuario) {
      this.usuarioService.actualizar(this.form.idUsuario, this.form).subscribe({
        next: () => {
          this.exito = 'Trabajador actualizado correctamente.';
          this.mostrarFormulario = false;
          this.cargar();
          setTimeout(() => (this.exito = ''), 3000);
        },
        error: () => (this.error = 'No se pudo actualizar el trabajador.'),
      });
    } else {
      this.usuarioService.registrar(this.form).subscribe({
        next: () => {
          this.exito = 'Trabajador registrado correctamente.';
          this.mostrarFormulario = false;
          this.cargar();
          setTimeout(() => (this.exito = ''), 3000);
        },
        error: () => (this.error = 'No se pudo registrar el trabajador. Verifica que el usuario no exista ya.'),
      });
    }
  }

  eliminar(trabajador: Usuario): void {
    if (!trabajador.idUsuario) return;
    if (!confirm(`¿Eliminar al trabajador "${trabajador.nombre}"?`)) return;

    this.usuarioService.eliminar(trabajador.idUsuario).subscribe({
      next: () => {
        this.exito = 'Trabajador eliminado.';
        this.cargar();
        setTimeout(() => (this.exito = ''), 3000);
      },
      error: () => (this.error = 'No se pudo eliminar el trabajador.'),
    });
  }
}
