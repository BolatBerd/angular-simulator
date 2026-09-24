import { Injectable, inject, signal, computed, WritableSignal, Signal, effect } from '@angular/core';
import { IProductListResponse } from '../interfaces/product/IProductListResponse';
import { IProductQueryParams } from '../interfaces/product/IProductQueryParams';
import { ProductApiService } from './product-api.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { IProduct } from '../interfaces/product/IProduct';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productApiService: ProductApiService = inject(ProductApiService);

  readonly products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  readonly page: WritableSignal<number> = signal(1);
  readonly pageSize: WritableSignal<number> = signal(10);
  readonly search: WritableSignal<string> = signal('');
  readonly category: WritableSignal<string | null> = signal<string | null>(null);
  readonly sortField: WritableSignal<string> = signal<string>('title');
  readonly sortOrder: WritableSignal<'asc' | 'desc'> = signal<'asc' | 'desc'>('asc');
  readonly total: WritableSignal<number> = signal(0);
  readonly loading: WritableSignal<boolean> = signal(false);

  readonly skip: Signal<number> = computed(() => (this.page() - 1) * this.pageSize());
  readonly totalPages: Signal<number> = computed(() => Math.ceil(this.total() / this.pageSize()));

  readonly queryParams: Signal<IProductQueryParams> = computed(() => ({
    limit: this.pageSize(),
    skip: this.skip(),
    sortBy: this.sortField(),
    order: this.sortOrder(),
    q: this.search() || undefined,
    category: this.category() || undefined
  }));

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

  private readonly loadProductsEffect = effect(() => {
    const params: IProductQueryParams = this.queryParams();

    if (!this.loading()) {
      this.executeLoadProducts(params);
    }
  });

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
        return [];
      })
    ).subscribe();
  }

  setSearch(query: string): void {
    this.search.set(query.trim());
    this.page.set(1);
  }

  setCategory(category: string | null): void {
    this.category.set(category);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(page);
  }

  setPageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.page.set(1);
  }

  setSort(field: string, order: 'asc' | 'desc'): void {
    this.sortField.set(field);
    this.sortOrder.set(order);
    this.page.set(1);
  }

  resetFilters(): void {
    this.search.set('');
    this.category.set(null);
    this.sortField.set('title');
    this.sortOrder.set('asc');
    this.page.set(1);
  }

}
