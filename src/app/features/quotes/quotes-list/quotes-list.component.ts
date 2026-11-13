import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesStore } from '../store/quotes.store';
import { IQuote } from '../interfaces/IQuote';
import { QuoteFilter } from '../enums/QuoteFilter';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes-list.component.html',
})
export class QuotesListComponent implements OnInit {

  protected store = inject(QuotesStore);
  protected QuoteFilter: typeof QuoteFilter = QuoteFilter;

  ngOnInit() {
    this.store.loadQuotes();
  }

  toggleFavorite(quote: IQuote) {
    this.store.toggleFavorite(quote);
  }

  setFilter(filter: QuoteFilter) {
    this.store.setFilter(filter);
  }

  pickRandom() {
    this.store.pickRandomQuote();
  }

  retry() {
    this.store.loadQuotes();
  }
}
