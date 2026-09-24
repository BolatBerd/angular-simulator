import { Component, inject, OnInit, OnDestroy, WritableSignal, DestroyRef } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, tap, Subscription, catchError } from 'rxjs';
import { SelectModule, SelectChangeEvent } from 'primeng/select';
import { IPaginatorPageChangeEvent } from '../interfaces/IPaginatorEvent';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductApiService } from '../services/product-api.service';
import { HttpErrorResponse } from '@angular/common/http';
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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink, CardModule, InputTextModule,
    SelectModule, PaginatorModule, SkeletonModule, ButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private readonly productService: ProductService = inject(ProductService);
  private readonly productApiService: ProductApiService = inject(ProductApiService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private searchSubscription?: Subscription;
  private readonly searchSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly search$: Observable<string> = this.searchSubject$.asObservable();

  readonly products: WritableSignal<IProduct[]> = this.productService.products;
  readonly loading: WritableSignal<boolean> = this.productService.loading;
  readonly page: WritableSignal<number> = this.productService.page;
  readonly pageSize: WritableSignal<number> = this.productService.pageSize;
  readonly total: WritableSignal<number> = this.productService.total;
  readonly category: WritableSignal<string | null> = this.productService.category;
  readonly sortField: WritableSignal<string> = this.productService.sortField;
  readonly sortOrder: WritableSignal<'asc' | 'desc'> = this.productService.sortOrder;

  readonly pageSizeOptions: ISelectOption<number>[] = [
    { label: '10', value: 10 }, { label: '20', value: 20 },
    { label: '30', value: 30 }
  ];
  readonly sortFieldOptions: ISelectOption<string>[] = [
    { label: 'Название', value: 'title' },
    { label: 'Цена', value: 'price' },
    { label: 'Рейтинг', value: 'rating' },
    { label: 'Остаток', value: 'stock' }
  ];
  readonly sortOrderOptions: ISelectOption<'asc' | 'desc'>[] = [
    { label: 'По возрастанию', value: 'asc' },
    { label: 'По убыванию', value: 'desc' }
  ];

  categories: ISelectOption<string | null>[] = [];

  ngOnInit(): void {
    this.productService.loadProducts();
    this.loadCategories();
    this.setupSearchDebounce();
  }

  private loadCategories(): void {
    this.productApiService.getCategories().pipe(
      tap((apiCategories: ICategory[]) => {
        const mappedCategories: ISelectOption<string>[] = apiCategories.map((cat: ICategory) => ({
          label: cat.name,
          value: cat.slug
        }));
        this.categories = [{ label: 'Все категории', value: null }, ...mappedCategories];
      }),
       catchError ((error: HttpErrorResponse) => {
        console.error('Ошибка загрузки категорий:', error);
        this.categories = [{ label: 'Ошибка загрузки', value: null }];
        return [];
      })
    ).subscribe();
  }

  private setupSearchDebounce(): void {
    this.searchSubscription = this.search$
    .pipe(
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

  onSortFieldChange(event: { value: string }): void {
    const newField: string = event.value;
    const currentOrder: 'asc' | 'desc' = this.sortOrder();
    this.productService.setSort(newField, currentOrder);
  }

  onSortOrderChange(event: { value: 'asc' | 'desc' }): void {
    const newOrder: 'asc' | 'desc' = event.value;
    const currentField: string = this.sortField();
    this.productService.setSort(currentField, newOrder);
  }

  onPageChange(event: IPaginatorPageChangeEvent): void {
    const newPage: number = (event.page ?? 0) + 1;
    const newPageSize: number = event.rows ?? 10;

    if (newPageSize !== this.pageSize()) {
      this.productService.setPageSize(newPageSize);
    } else {
      this.productService.setPage(newPage);
    }
  }

  onResetFilters(): void {
    this.productService.resetFilters();
  }
  
}
