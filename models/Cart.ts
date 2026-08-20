export interface ItemCart {
  productId: string;
  quantity: number;
}

export interface Cart {
  products: ItemCart[];
}

export interface CartResponse {
  _id: string;
  products: ItemCart[];
  totalPrice: number;
  totalQuantity: number;
  userId: string;
}