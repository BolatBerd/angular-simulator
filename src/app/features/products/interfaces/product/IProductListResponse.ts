import { IProduct } from './IProduct';

export interface IProductListResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
