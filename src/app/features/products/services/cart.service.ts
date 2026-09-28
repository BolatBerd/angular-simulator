import { Injectable, inject, signal, computed, WritableSignal, Signal } from '@angular/core';
import { catchError, tap, EMPTY, throwError, of, Observable, map } from 'rxjs';
import { CartApiService } from './cart-api.service';
import { IProduct } from '../interfaces/product/IProduct';
import { ICart } from '../interfaces/cart/ICart';
import { ICartItem } from '../interfaces/cart/ICartItem';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartApiService: CartApiService = inject(CartApiService);
  private readonly messageService: MessageService = inject(MessageService);

  readonly cartId: WritableSignal<number | null> = signal<number | null>(null);
  readonly items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  readonly loading: WritableSignal<boolean> = signal(false);
  private readonly TAX_RATE: number = 0.2;
  private readonly CART_STORAGE_KEY: string = 'shopping_cart';
  readonly itemsCount: Signal<number> = computed(() => this.items().length);

  readonly totalQuantity: Signal<number> = computed(() => {
    return this.items().reduce((sum: number, item: ICartItem) => sum + item.quantity, 0);
  });

  readonly subtotal: Signal<number> = computed(() => {
    return this.items().reduce((sum: number, item: ICartItem) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  });

  readonly tax: Signal<number> = computed(() => {
    return this.subtotal() * this.TAX_RATE;
  });

  readonly total: Signal<number> = computed(() => {
    return this.subtotal() + this.tax();
  });

  constructor() {
    this.loadFromLocalStorage();
  }

addToCart(product: IProduct, quantity: number = 1): Observable<boolean> {
  const currentItems: ICartItem[] = this.items();
  const existingItem: ICartItem | undefined = currentItems.find(item => item.product.id === product.id);
  const currentQuantity: number = existingItem ? existingItem.quantity : 0;

  if (currentQuantity + quantity > product.stock) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Недостаточно товара',
      detail: `На складе осталось только ${product.stock} шт.`,
      life: 3000
    });
    return of(false);
  }

  const previousItems: ICartItem[] = [...currentItems];

  let newItems: ICartItem[];

  if (existingItem) {
    newItems = currentItems.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    newItems = [...currentItems, { product, quantity }];
  }

  this.items.set(newItems);
  this.saveToLocalStorage();

  return this.syncCartWithServer(previousItems);
}

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const product: IProduct | undefined = this.items().find((item: ICartItem) => item.product.id === productId)?.product;

    if (product && quantity > product.stock) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Недостаточно товара',
        detail: `На складе осталось только ${product.stock} шт.`,
        life: 3000
      });
      return;
    }

    const previousItems = [...this.items()];

    const newItems: ICartItem[] = this.items().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    this.items.set(newItems);
    this.saveToLocalStorage();
    this.syncCartWithServer(previousItems);
  }

  removeFromCart(productId: number): void {
    const previousItems: ICartItem[] = [...this.items()];
    const newItems: ICartItem[] = this.items().filter((item: ICartItem) => item.product.id !== productId);
    this.items.set(newItems);
    this.saveToLocalStorage();
    this.syncCartWithServer(previousItems);
  }

  clearCart(): void {
    const previousItems: ICartItem[] = [...this.items()];
    this.items.set([]);
    this.saveToLocalStorage();

    if (this.cartId()) {
      this.cartApiService.deleteCart(this.cartId()!)
      .pipe(
        catchError(error => {
          this.items.set(previousItems);
          this.saveToLocalStorage();
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось очистить корзину',
            life: 3000
          });
          return throwError(() => error);
        })
      ).subscribe();
      this.cartId.set(null);
    }
  }

  loadCart(cartId: number): void {
    this.loading.set(true);

    this.cartApiService.getCartById(cartId)
      .pipe(
        tap((cart: ICart) => {
            this.items.set(cart.products as unknown as ICartItem[]);
            this.cartId.set(cart.id);
            this.saveToLocalStorage();
            this.loading.set(false);
          }),
          catchError((error) => {
            console.error('Ошибка загрузки корзины:', error);
            this.loading.set(false);
            return EMPTY;
          }
        )
      ).subscribe();
  }

  private saveToLocalStorage(): void {
    try {
      const cartData = {
        cartId: this.cartId(),
        items: this.items()
      };
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Ошибка сохранения корзины в localStorage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const saved: string | null = localStorage.getItem(this.CART_STORAGE_KEY);
      if (saved) {
        const cartData = JSON.parse(saved);
        this.cartId.set(cartData.cartId);
        this.items.set(cartData.items);
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины из localStorage:', error);
    }
  }

  private syncCartWithServer(previousItems: ICartItem[]): Observable<boolean> {
    const payload = {
      products: this.items().map(item => ({
        id: item.product.id,
        quantity: item.quantity
      }))
    };

    if (this.cartId()) {
      this.cartApiService.updateCart(this.cartId()!, payload)
      .pipe(
        map(() => true),
        catchError(error => {
          this.items.set(previousItems);
          this.saveToLocalStorage();
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка синхронизации',
            detail: 'Не удалось обновить корзину на сервере',
            life: 3000
          });
          return of(false);
        })
      ).subscribe();
    } else if (this.items().length > 0) {
      this.cartApiService.createCart(1, payload).pipe(
        tap(cart => {
          this.cartId.set(cart.id);
          this.saveToLocalStorage();
        }),
        map(() => true),
        catchError(error => {
          this.items.set(previousItems);
          this.saveToLocalStorage();
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка синхронизации',
            detail: 'Не удалось создать корзину на сервере',
            life: 3000
          });
          return of(false);
        })
      ).subscribe();
    }
    return of(true);
  }

  calculateItemTotal(price: number, quantity: number): number {
    return price * quantity;
  }

}
