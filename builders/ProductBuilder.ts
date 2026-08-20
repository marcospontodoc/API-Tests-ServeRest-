import { fakerPT_BR as faker } from '@faker-js/faker';
import { Product } from '../models/Product';

export function createProduct(): Product {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
    preco: faker.number.int({
      min: 10,
      max: 1000,
    }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({
      min: 1,
      max: 100,
    }),
  };
}