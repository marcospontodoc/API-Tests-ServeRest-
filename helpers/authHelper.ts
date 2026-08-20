import { APIRequestContext, expect } from '@playwright/test';

import { UserApi } from '../api/UserApi';
import { AuthApi } from '../api/AuthApi';

import { createUser } from '../builders/UserBuilder';

export async function createAdminAndgetToken(
  request: APIRequestContext
): Promise<string> {

  const userApi = new UserApi(request);
  const authApi = new AuthApi(request);

  const admin = createUser(true);

  const register = await userApi.create(admin);

  expect(register.status()).toBe(201);


  const login = await authApi.login({
    email: admin.email,
    password: admin.password,
  });

  expect(login.status()).toBe(200);

  const body = await login.json();

  return body.authorization;
}