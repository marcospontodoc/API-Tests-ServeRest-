import { fakerPT_BR as faker } from '@faker-js/faker';
import { Product } from '../models/Product';

export function createProduct(): Product {
  return {
    name: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
    price: faker.number.int({
      min: 10,
      max: 1000,
    }),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({
      min: 1,
      max: 100,
    }),
  };
}