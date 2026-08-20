import { APIRequestContext } from '@playwright/test';
import { Cart } from '../models/Cart';

export class CartApi {

  constructor(
    private request: APIRequestContext
  ) {}

  async list(token: string) {
    return await this.request.get('/carrinhos', {
      headers: {
        Authorization: token,
      },
    });
  }

  async search(
    id: string,
    token: string
  ) {
    return await this.request.get(`/carrinhos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  async create(
    cart: Cart,
    token: string
  ) {
    return await this.request.post('/carrinhos', {
      headers: {
        Authorization: token,
      },
      data: cart,
    });
  }

  async completePurchase(token: string) {
    return await this.request.delete(
      '/carrinhos/concluir-compra',
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  async cancelPurchase(token: string) {
    return await this.request.delete(
      '/carrinhos/cancelar-compra',
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}