export interface Usuario {
  idUsuario?: number;
  username: string;
  password: string;
  nombre: string;
  rol: string;
}

// Body para POST /api/auth/login
export interface LoginRequest {
  username: string;
  password: string;
}
