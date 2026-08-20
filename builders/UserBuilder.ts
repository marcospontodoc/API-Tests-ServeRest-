import { fakerPT_BR as faker } from '@faker-js/faker';
import { User } from '../models/User';

export function createUser(
  administrador: boolean = false
): User {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 12,
    }),
    administrator: administrador.toString(),
  };
}