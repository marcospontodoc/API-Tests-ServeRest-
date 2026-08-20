import { test, expect } from '@playwright/test';
import { ProductApi } from '../api/ProductApi';
import { createProduct } from '../builders/ProductBuilder';
import { createAdminAndgetToken } from '../helpers/authHelper';


test.describe('API - Products', () => {

  let productApi: ProductApi;
  let token: string;

  let productsCreated: string[] = [];

  test.beforeEach(async ({ request }) => {

    productApi = new ProductApi(request);

    token = await createAdminAndgetToken(request);

  });

  test.afterEach(async () => {

    for (const productId of productsCreated) {

      const response =
        await productApi.delete(
          productId,
          token
        );

      expect([200, 204]).toContain(
        response.status()
      );
    }

    productsCreated = [];

  });

  test('should create a product with valid data', async () => {

    const product = createProduct();

    const response =
      await productApi.create(
        product,
        token
      );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.message).toBe(
      'Cadastro realizado com sucesso'
    );

    expect(body).toHaveProperty('_id');

    productsCreated.push(body._id);

  });

  test('should not create a product without a name', async () => {

    const product = createProduct();

    product.nome = '';

    const response =
      await productApi.create(
        product,
        token
      );

    expect(response.status()).toBe(400);

  });

  test('should not create a product without a price', async () => {

    const product = createProduct();
    product.preco = 0;

    const response =
      await productApi.create(
        product,
        token
      );

    expect(response.status()).toBe(400);

  });

  test('should not create a product without a description', async () => {

    const product = createProduct();
    product.descricao = '';

    const response =
      await productApi.create(
        product,
        token
      );

    expect(response.status()).toBe(400);
  });


  test('should not create a product with a duplicate name', async () => {

    const product = createProduct();

    const firstResponse =
      await productApi.create(
        product,
        token
      );

    expect(firstResponse.status()).toBe(201);

    const firstBody = await firstResponse.json();

    productsCreated.push(firstBody._id);

    const secondResponse =
      await productApi.create(
        product,
        token
      );

    expect(secondResponse.status()).toBe(400);

    const secondBody = await secondResponse.json();

    expect(secondBody.message).toContain(
      'Já existe produto com esse nome'
    );

  });

});

test.describe('API - Products - Unauthenticated', () => {

  test('should not create a product without authentication', async ({
    request,
  }) => {

    const productApi = new ProductApi(request);

    const product = createProduct();

    const response =
      await productApi.create(product);

    expect(response.status()).toBe(401);
  });

});