export interface Product {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

export interface ProductResponse extends Product {
  _id: string;
}