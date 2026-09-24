import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductApiService } from './services/product-api.service';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/product/IProduct';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<IProduct> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<IProduct> => {
  const productApiService: ProductApiService = inject(ProductApiService);
  const productId: number = Number(route.paramMap.get('id'));
  return productApiService.getProductById(productId);
};
