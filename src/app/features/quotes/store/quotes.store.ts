import { signalStore, patchState, withState, withComputed, withMethods, type } from '@ngrx/signals';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IQuotesResponse } from '../interfaces/IQuotesResponse';
import { IQuotesState } from '../interfaces/IQuotesState';
import { QuoteFilter } from '../enums/QuoteFilter';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { IQuote } from '../interfaces/IQuote';

const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  loading: false,
  error: null,
  filter: QuoteFilter.All,
  randomQuote: null,
};

export const provideQuotesStore = () => QuotesStore;

export const QuotesStore = signalStore(
  withState(type<IQuotesState>()),
  withState(initialState),
  withComputed((store) => ({
    favoritesCount: (): number => store.favorites().length,
    authorsCount: (): number => new Set(store.quotes().map((q: IQuote) => q.author)).size,
    displayedQuotes: (): IQuote[] => {
      const currentFilter: QuoteFilter = store.filter();
      if (currentFilter === QuoteFilter.Favorites) {
        return store.favorites();
      }
      return store.quotes();
    }
  })),

  withMethods((store, http = inject(HttpClient)) => {
    const loadQuotes: () => void = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() => http.get<IQuotesResponse>('https://dummyjson.com/quotes')
          .pipe(
            tap((response: IQuotesResponse) => patchState(store, { quotes: response.quotes, loading: false })),
            catchError((err: HttpErrorResponse) => {
              patchState(store, { error: err.message, loading: false });
              return of(null);
            })
          )
        )
      )
    );

    return {
      loadQuotes,

      toggleFavorite(quote: IQuote) {
        const isFav: boolean = store.favorites().some((f: IQuote) => f.id === quote.id);
        if (isFav) {
          patchState(store, {
            favorites: store.favorites().filter((f: IQuote) => f.id !== quote.id)
          });
        } else {
          patchState(store, {
            favorites: [...store.favorites(), quote]
          });
        }
      },

      setFilter(filter: QuoteFilter) {
        patchState(store, { filter });
      },

      pickRandomQuote() {
        const allQuotes: IQuote[] = store.quotes();
        if (allQuotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * allQuotes.length);
          patchState(store, { randomQuote: allQuotes[randomIndex] });
        }
      }
    };
  })
);
