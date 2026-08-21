import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = '';
  cargando = false;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Ingresa usuario y clave';
      return;
    }

    this.cargando = true;

    this.usuarioService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (usuario) => {
          this.cargando = false;
          this.authService.guardarSesion(usuario);
          this.router.navigate(['/admin/panel']);
        },
        error: () => {
          this.cargando = false;
          this.error = 'Credenciales inválidas';
        },
      });
  }
}
