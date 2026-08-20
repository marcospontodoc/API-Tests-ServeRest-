export interface ItemCart {
  idProduto: string;
  quantidade: number;
}

export interface Cart {
  produtos: ItemCart[];
}