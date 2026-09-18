import { HttpClient, HttpParams } from '@angular/common/http';
import { IProductListResponse } from '../interfaces/product/IProductListResponse';
import { IProductQueryParams } from '../interfaces/product/IProductQueryParams';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product/IProduct';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com/products';

  getProducts(params: IProductQueryParams = {}): Observable<IProductListResponse> {
    let httpParams: HttpParams = new HttpParams();

    if (params.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.skip !== undefined) {
      httpParams = httpParams.set('skip', params.skip.toString());
    }
    if (params.sortBy !== undefined) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.order !== undefined) {
      httpParams = httpParams.set('order', params.order);
    }
    if (params.q !== undefined) {
      httpParams = httpParams.set('q', params.q);
    }
    if (params.category !== undefined) {
      httpParams = httpParams.set('category', params.category);
    }

    return this.http.get<IProductListResponse>(this.baseUrl, { params: httpParams });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(category: string, params: IProductQueryParams = {}): Observable<IProductListResponse> {
    let httpParams = new HttpParams();

    if (params.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.skip !== undefined) {
      httpParams = httpParams.set('skip', params.skip.toString());
    }
    if (params.sortBy !== undefined) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.order !== undefined) {
      httpParams = httpParams.set('order', params.order);
    }

    console.log('🌐 URL запроса:', `${this.baseUrl}?${httpParams.toString()}`);
    return this.http.get<IProductListResponse>(
      `${this.baseUrl}/category/${category}`,
      { params: httpParams }
    );
  }

  searchProducts(query: string, params: IProductQueryParams = {}): Observable<IProductListResponse> {
    let httpParams = new HttpParams().set('q', query);

    if (params.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.skip !== undefined) {
      httpParams = httpParams.set('skip', params.skip.toString());
    }
    if (params.sortBy !== undefined) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.order !== undefined) {
      httpParams = httpParams.set('order', params.order);
    }

    return this.http.get<IProductListResponse>(
      `${this.baseUrl}/search`,
      { params: httpParams }
    );
  }
  
}
