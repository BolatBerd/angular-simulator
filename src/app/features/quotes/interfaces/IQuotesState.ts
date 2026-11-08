import { IQuote } from './IQuote';

export interface IQuotesState {
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'favorites';
  randomQuote: IQuote | null;
}
