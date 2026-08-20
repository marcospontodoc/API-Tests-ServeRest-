import { APIRequestContext } from '@playwright/test';
import { Product } from '../models/Product';

export class ProductApi {

  constructor(
    private request: APIRequestContext
  ) {}

  async list() {
    return await this.request.get('/produtos');
  }

  async search(id: string) {
    return await this.request.get(`/produtos/${id}`);
  }

  async create(
    product: Product,
    token: string
  ) {
    return await this.request.post('/produtos', {
      headers: {
        Authorization: token,
      },
      data: product,
    });
  }

  async update(
    id: string,
    product: Product,
    token: string
  ) {
    return await this.request.put(`/produtos/${id}`, {
      headers: {
        Authorization: token,
      },
      data: product,
    });
  }

  async delete(
    id: string,
    token: string
  ) {
    return await this.request.delete(`/produtos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}