import { BehaviorSubject, Observable, debounceTime, tap, Subscription, catchError, EMPTY, skip } from 'rxjs';
import { Component, inject, OnInit, WritableSignal, DestroyRef } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { SelectModule, SelectChangeEvent } from 'primeng/select';
import { IPaginatorPageChangeEvent } from '../interfaces/IPaginatorEvent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductApiService } from '../services/product-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProductFilters } from '../interfaces/IProductFilters';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductService } from '../services/product.service';
import { ISelectOption } from '../interfaces/ISelectOption';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ICategory } from '../interfaces/ICategory';
import { IProduct } from '../interfaces/product/IProduct';
import { SortField } from '../SortField';
import { SortOrder } from '../SortOrder';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, CardModule, InputTextModule,
    SelectModule, PaginatorModule, SkeletonModule, ButtonModule, TranslatePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private readonly productService: ProductService = inject(ProductService);
  private readonly productApiService: ProductApiService = inject(ProductApiService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private searchSubscription?: Subscription;
  private readonly searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly search$: Observable<string> = this.searchSubject$.asObservable();

  readonly products: WritableSignal<IProduct[]> = this.productService.products;
  readonly loading: WritableSignal<boolean> = this.productService.loading;
  readonly total: WritableSignal<number> = this.productService.total;
  readonly filters: WritableSignal<IProductFilters> = this.productService.filters;

  pageSizeOptions: number[] = [];
  sortFieldOptions: ISelectOption<SortField>[] = [];
  sortOrderOptions: ISelectOption<SortOrder>[] = [];

  categories: ISelectOption<string | null>[] = [];

  ngOnInit(): void {
    this.productService.loadProducts();
    this.loadCategories();
    this.setupSearchDebounce();
    this.initOptions();
  }

  private initOptions(): void {
    this.pageSizeOptions = [10, 20, 30];

    this.sortFieldOptions = [
      { label: this.translateService.instant('PRODUCTS.SORT.FIELD.TITLE'), value: SortField.Title },
      { label: this.translateService.instant('PRODUCTS.SORT.FIELD.PRICE'), value: SortField.Price },
      { label: this.translateService.instant('PRODUCTS.SORT.FIELD.RATING'), value: SortField.Rating },
      { label: this.translateService.instant('PRODUCTS.SORT.FIELD.STOCK'), value: SortField.Stock }
    ];

    this.sortOrderOptions = [
      { label: this.translateService.instant('PRODUCTS.SORT.ORDER.ASC'), value: SortOrder.Asc },
      { label: this.translateService.instant('PRODUCTS.SORT.ORDER.DESC'), value: SortOrder.Desc }
    ];
  }

  private loadCategories(): void {
    this.productApiService.getCategories().pipe(
      tap((apiCategories: ICategory[]) => {
        const mappedCategories: ISelectOption<string>[] = apiCategories.map((cat: ICategory) => ({
          label: cat.name,
          value: cat.slug
        }));
        this.categories = [
          { label: this.translateService.instant('PRODUCTS.CATEGORY.ALL'), value: null },
          ...mappedCategories
        ];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Ошибка загрузки категорий:', error);
        this.categories = [{ label: 'Ошибка загрузки', value: null }];
        return EMPTY;
      })
    ).subscribe();
  }

  private setupSearchDebounce(): void {
    this.searchSubscription = this.search$
      .pipe(
        skip(1),
        debounceTime(500),
        tap((query: string) => this.productService.setSearch(query)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
  }

  onSearchInput(event: Event): void {
    const query: string = (event.target as HTMLInputElement).value;
    this.searchSubject$.next(query);
  }

  onCategoryChange(event: SelectChangeEvent): void {
    this.productService.setCategory(event.value);
  }

    onSortFieldChange(value: SortField): void {
    const currentOrder: SortOrder = this.filters().sortOrder;
    this.productService.setSort(value, currentOrder);
  }

  onSortOrderChange(value: SortOrder): void {
    const currentField: SortField = this.filters().sortField;
    this.productService.setSort(currentField, value);
  }

  onPageChange(event: IPaginatorPageChangeEvent): void {
    const newPage: number = (event.page ?? 0) + 1;
    const newPageSize: number = event.rows ?? 10;

    if (newPageSize !== this.filters().pageSize) {
      this.productService.setPageSize(newPageSize);
    } else {
      this.productService.setPage(newPage);
    }
  }

  onResetFilters(): void {
    this.productService.resetFilters();
  }
}
