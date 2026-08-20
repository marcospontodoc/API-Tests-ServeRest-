export interface User {
  nome: string;
  email: string;
  password: string;
  administrador: string;
}

export interface UserResponse {
  message: string;
  _id: string;
}