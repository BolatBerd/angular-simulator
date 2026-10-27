export interface IUpdateCartPayload {
  products: {
    id: number;
    quantity: number;
  }[];
}
