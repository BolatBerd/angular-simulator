import { HttpClient, HttpParams } from '@angular/common/http';
import { IProductListResponse } from '../interfaces/product/IProductListResponse';
import { IProductQueryParams } from '../interfaces/product/IProductQueryParams';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/ICategory';
import { IProduct } from '../interfaces/product/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com/products';

  private buildHttpParams<T extends object>(params: T): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return httpParams;
  }

  getProducts(params: IProductQueryParams = {}): Observable<IProductListResponse> {
    const httpParams: HttpParams = this.buildHttpParams(params);
    return this.http.get<IProductListResponse>(this.baseUrl, { params: httpParams });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.baseUrl }/${id}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.baseUrl }/categories`);
  }

 getProductsByCategory(category: string, params: IProductQueryParams = {}): Observable<IProductListResponse> {
    const httpParams: HttpParams = this.buildHttpParams({ ...params, category });
    return this.http.get<IProductListResponse>(`${ this.baseUrl }/category/${category}`, { params: httpParams });
  }

  searchProducts(query: string, params: IProductQueryParams = {}): Observable<IProductListResponse> {
    const httpParams: HttpParams = this.buildHttpParams({ ...params, q: query });
    return this.http.get<IProductListResponse>(`${ this.baseUrl }/search`, { params: httpParams });
  }

}
