import { APIRequestContext } from '@playwright/test';
import { User } from '../models/User';

export class UserApi {

  constructor(
    private request: APIRequestContext
  ) {}

  async create(user: User) {
    return await this.request.post('/usuarios', {
      data: user,
    });
  }

  async list() {
    return await this.request.get('/usuarios');
  }

  async search(id: string) {
    return await this.request.get(`/usuarios/${id}`);
  }

  async update(
    id: string,
    user: User
  ) {
    return await this.request.put(`/usuarios/${id}`, {
      data: user,
    });
  }

  async delete(id: string) {
    return await this.request.delete(`/usuarios/${id}`);
  }
}