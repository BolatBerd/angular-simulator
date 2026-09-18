import { IUpdateCartPayload } from '../interfaces/cart/IUpdateCartPayload';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/cart/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com/carts';

  getCartById(cartId: number): Observable<ICart> {
    return this.http.get<ICart>(`${this.baseUrl}/${cartId}`);
  }

  createCart(userId: number, payload: IUpdateCartPayload): Observable<ICart> {
    return this.http.post<ICart>(`${this.baseUrl}/add`, { userId, products: payload.products });
  }

  updateCart(cartId: number, payload: IUpdateCartPayload): Observable<ICart> {
    return this.http.put<ICart>(`${this.baseUrl}/${cartId}`, { merge: true, products: payload.products });
  }

  deleteCart(cartId: number): Observable<ICart> {
    return this.http.delete<ICart>(`${this.baseUrl}/${cartId}`);
  }

}
