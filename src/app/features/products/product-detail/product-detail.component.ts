import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IProduct } from '../interfaces/product/IProduct';
import { CartService } from '../services/cart.service';
import { catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly cartService: CartService = inject(CartService);
  private readonly messageService: MessageService = inject(MessageService);

  readonly product: WritableSignal<IProduct | null> = signal<IProduct | null>(null);

  ngOnInit(): void {
    const resolvedProduct: IProduct = this.route.snapshot.data['product'] as IProduct;
    this.product.set(resolvedProduct);
  }

  getDiscountedPrice(product: IProduct): number {
    const discount: number = product.price * (product.discountPercentage / 100);
    return Math.round((product.price - discount) * 100) / 100;
  }

  onAddToCart(): void {
    const product: IProduct | null = this.product();
    if (!product) return;

    this.cartService.addToCart(product)
      .pipe(
        tap((success: boolean) => {
          if (success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Добавлено в корзину',
              detail: `${ product.title } добавлен в корзину`,
              life: 3000
            });
          }
        },
      catchError ((error: HttpErrorResponse) => {
        console.error('Непредвиденная ошибка при добавлении в корзину:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось добавить товар в корзину',
          life: 3000
        });
        return [];
      })
    )).subscribe();
  }

}
