import { test, expect } from '@playwright/test';

import { ProductApi } from '../api/ProductApi';
import { CartApi } from '../api/CartApi';

import { createProduct } from '../builders/ProductBuilder';
import { createCart } from '../builders/CartBuilder';

import { createAdminAndgetToken } from '../helpers/authHelper';


test.describe('API - Cart', () => {

  let productApi: ProductApi;
  let cartApi: CartApi;

  let token: string;
  let productId: string;


  test.beforeEach(async ({ request }) => {

    productApi = new ProductApi(request);
    cartApi = new CartApi(request);

    token = await createAdminAndgetToken(request);

    const product = createProduct();

    const response = await productApi.create(
      product,
      token
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    productId = body._id;
  });


  test.afterEach(async () => {

    await cartApi.cancelPurchase(token);

    const response = await productApi.delete(
      productId,
      token
    );

    expect([200, 204]).toContain(
      response.status()
    );
  });


  test('should add a product to the cart', async () => {

    const cart = createCart(productId);

    const response = await cartApi.create(
      cart,
      token
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.message).toBe(
      'Cadastro realizado com sucesso'
    );
  });

test('should not allow adding a quantity greater than the available stock', async () => {

  const product = await productApi.search(productId);

  expect(product.status()).toBe(200);

  const productBody = await product.json();

  const stock = productBody.quantidade;

  const cart = createCart(
    productId,
    stock + 1
  );

  const response = await cartApi.create(
    cart,
    token
  );

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.message).toBe(
    'Produto não possui quantidade suficiente'
  );
});

});