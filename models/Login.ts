export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  authorization: string;
}