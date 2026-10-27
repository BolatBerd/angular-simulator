import { SortField } from '../SortField';
import { SortOrder } from '../SortOrder';

export interface IProductFilters {
  search: string;
  category: string | null;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}
