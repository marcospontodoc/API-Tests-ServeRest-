import { fakerPT_BR as faker } from '@faker-js/faker';
import { User } from '../models/User';

export function createUser(
  administrador: boolean = false
): User {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 12,
      memorable: false,
    }),
    administrador: administrador.toString(),
  };
}