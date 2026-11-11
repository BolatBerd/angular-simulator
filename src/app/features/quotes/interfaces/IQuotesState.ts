import { QuoteFilter } from '../enums/QuoteFilter';
import { IQuote } from './IQuote';

export interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean;
  error: string | null;
  filter: QuoteFilter;
  randomQuote: IQuote | null;
}
