import { Cart } from '../models/Cart';

export function createCart(
  productId: string,
  quantity: number = 1
): Cart {
  return {
    produtos: [
      {
        idProduto: productId,
        quantidade: quantity,
      },
    ],
  };
}