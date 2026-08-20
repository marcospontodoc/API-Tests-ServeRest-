import { test, expect } from '@playwright/test';
import { AuthApi } from '../api/AuthApi';
import { UserApi } from '../api/UserApi';
import { ProductApi } from '../api/ProductApi';
import { createUser } from '../builders/UserBuilder';
import { createProduct } from '../builders/ProductBuilder';

test.describe('API - Products', () => {

  let userApi: UserApi;
  let authApi: AuthApi;
  let productApi: ProductApi;

  test.beforeEach(async ({ request }) => {

    userApi = new UserApi(request);
    authApi = new AuthApi(request);
    productApi = new ProductApi(request);

  });

  test('deve cadastrar um produto com usuário administrador', async () => {

    // Arrange
    const admin = createUser(true);

    // Cria administrador
    const cadastroUsuario =
      await userApi.create(admin);
      expect(cadastroUsuario.status()).toBe(201);

    // Login
    const login =
      await authApi.login({
        email: admin.email,
        password: admin.password,
      });

    expect(login.status()).toBe(200);

    const loginBody = await login.json();

    const token = loginBody.authorization;

    // Cria produto
    const produto = createProduct();

    // Act
    const response =
      await productApi.create(
        produto,
        token
      );

    // Assert
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.message).toBe(
      'Cadastro realizado com sucesso'
    );

    expect(body).toHaveProperty('_id');

  });

});