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
  let productStock: number;


  test.beforeEach(async ({ request }) => {

    productApi = new ProductApi(request);
    cartApi = new CartApi(request);

    token = await createAdminAndgetToken(request);

    const product = createProduct();
    productStock = product.quantidade;

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

test('should delete cart and restore product stock when canceling a purchase', async () => {

  const quantity = 3;

  const cart = createCart(
    productId,
    quantity
  );

 
  const createCartResponse =
    await cartApi.create(
      cart,
      token
    );

  expect(createCartResponse.status()).toBe(201);

  const cartBody = await createCartResponse.json();

  const cartId = cartBody._id;

  
  const productAfterCart =
    await productApi.search(productId);

  expect(productAfterCart.status()).toBe(200);

  const productAfterCartBody =
    await productAfterCart.json();

  expect(productAfterCartBody.quantidade).toBe(
    productStock - quantity
  );

  
  const cancelResponse =
    await cartApi.cancelPurchase(token);

  expect(cancelResponse.status()).toBe(200);

 
  const cartSearchResponse =
    await cartApi.search(
      cartId,
      token
    );

  expect(cartSearchResponse.status()).toBe(400);

 
  const productAfterCancel =
    await productApi.search(productId);

  expect(productAfterCancel.status()).toBe(200);

  const productAfterCancelBody =
    await productAfterCancel.json();

  expect(productAfterCancelBody.quantidade).toBe(
    productStock
  );
});
});