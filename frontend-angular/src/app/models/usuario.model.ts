export interface Usuario {
  idUsuario?: number;
  username: string;
  password: string;
  nombre: string;
  rol: string;
}


export interface LoginRequest {
  username: string;
  password: string;
}
