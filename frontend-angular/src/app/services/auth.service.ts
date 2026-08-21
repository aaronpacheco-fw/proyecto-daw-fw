import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario.model';

const STORAGE_KEY = 'fourways_usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private esNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  private usuario: Usuario | null = this.leerUsuarioGuardado();

  private leerUsuarioGuardado(): Usuario | null {
    if (!this.esNavegador) return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as Usuario) : null;
    } catch {
      return null;
    }
  }

  guardarSesion(usuario: Usuario): void {
    this.usuario = usuario;
    if (this.esNavegador) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    }
  }

  logout(): void {
    this.usuario = null;
    if (this.esNavegador) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  isAuthenticated(): boolean {
    return this.usuario !== null;
  }

  getUsuario(): Usuario | null {
    return this.usuario;
  }

  getRol(): string {
    return this.usuario?.rol ?? '';
  }

  esAdmin(): boolean {
    return this.getRol().toUpperCase() === 'ADMIN';
  }
}
