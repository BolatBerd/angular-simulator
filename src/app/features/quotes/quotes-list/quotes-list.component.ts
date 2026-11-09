import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesStore } from '../store/quotes.store';

@Component({
  selector: 'app-quotes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes-list.component.html',
  // providers: [QuotesStore]
})
export class QuotesListComponent implements OnInit {

  protected store = inject(QuotesStore);

  ngOnInit() {
    this.store.loadQuotes();
  }

  toggleFavorite(quote: any) {
    this.store.toggleFavorite(quote);
  }

  setFilter(filter: 'all' | 'favorites') {
    this.store.setFilter(filter);
  }

  pickRandom() {
    this.store.pickRandomQuote();
  }

  retry() {
    this.store.loadQuotes();
  }
}
