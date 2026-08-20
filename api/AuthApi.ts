import { APIRequestContext } from '@playwright/test';
import { Login } from '../models/Login';

export class AuthApi {

  constructor(
    private request: APIRequestContext
  ) {}

  async login(login: Login) {
    return await this.request.post('/login', {
      data: login,
    });
  }
}