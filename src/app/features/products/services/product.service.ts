import { Injectable, inject, signal, computed, WritableSignal, Signal, effect, untracked, EffectRef } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { IProductListResponse } from '../interfaces/product/IProductListResponse';
import { IProductQueryParams } from '../interfaces/product/IProductQueryParams';
import { ProductApiService } from './product-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProductFilters } from '../interfaces/IProductFilters';
import { IProduct } from '../interfaces/product/IProduct';
import { SortField } from '../SortField';
import { SortOrder } from '../SortOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productApiService: ProductApiService = inject(ProductApiService);

  readonly products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  readonly total: WritableSignal<number> = signal(0);
  readonly loading: WritableSignal<boolean> = signal(false);
  DEFAULT_FILTERS: IProductFilters = {
    search: '',
    category: null,
    sortField: SortField.Title,
    sortOrder: SortOrder.Asc,
    page: 1,
    pageSize: 10
  };

  readonly filters: WritableSignal<IProductFilters> = signal<IProductFilters>({ ...this.DEFAULT_FILTERS });

  readonly skip: Signal<number> = computed(() => (this.filters().page - 1) * this.filters().pageSize);
  readonly totalPages: Signal<number> = computed(() => Math.ceil(this.total() / this.filters().pageSize));

  readonly queryParams: Signal<IProductQueryParams> = computed(() => ({
    limit: this.filters().pageSize,
    skip: this.skip(),
    sortBy: this.filters().sortField,
    order: this.filters().sortOrder,
    q: this.filters().search || undefined,
    category: this.filters().category || undefined
  }));

  private readonly filterKey: Signal<string> = computed(() =>
    JSON.stringify({
      search: this.filters().search,
      category: this.filters().category,
      sortField: this.filters().sortField,
      sortOrder: this.filters().sortOrder,
      pageSize: this.filters().pageSize
    })
  );

  private readonly resetPageEffect: EffectRef = effect(() => {
    this.filterKey();

    untracked(() => {
      if (this.filters().page !== 1) {
        this.filters.update((f: IProductFilters) => ({ ...f, page: 1 }));
      }
    });
  });

  private readonly loadProductsEffect: EffectRef = effect(() => {
    const params: IProductQueryParams = this.queryParams();

    if (!untracked(() => this.loading())) {
      this.executeLoadProducts(params);
    }
  });

  private getRequest$(params: IProductQueryParams): Observable<IProductListResponse> {
    if (params.q) {
      return this.productApiService.searchProducts(params.q, params);
    }
    if (params.category) {
      return this.productApiService.getProductsByCategory(params.category, params);
    }
    return this.productApiService.getProducts(params);
  }

  loadProducts(): void {
    this.executeLoadProducts(this.queryParams());
  }

  private executeLoadProducts(params: IProductQueryParams): void {
    this.loading.set(true);

    this.getRequest$(params).pipe(
      tap((response: IProductListResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка загрузки продуктов:', error);
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe();
  }

  setSearch(query: string): void {
    this.filters.update(f => ({ ...f, search: query.trim() }));
  }

  setCategory(category: string | null): void {
    this.filters.update(f => ({ ...f, category }));
  }

  setPage(page: number): void {
    this.filters.update(f => ({ ...f, page }));
  }

  setPageSize(pageSize: number): void {
    this.filters.update(f => ({ ...f, pageSize }));
  }

  setSort(field: SortField, order: SortOrder): void {
    this.filters.update(f => ({ ...f, sortField: field, sortOrder: order }));
  }

  resetFilters(): void {
    this.filters.set({ ...this.DEFAULT_FILTERS });
  }

}
