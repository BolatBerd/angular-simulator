export interface IProductQueryParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  q?: string;
  category?: string;
}
