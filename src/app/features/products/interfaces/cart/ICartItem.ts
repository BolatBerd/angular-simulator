import { IProduct } from '../product/IProduct';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
