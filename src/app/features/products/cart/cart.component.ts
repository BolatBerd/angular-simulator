import { Component, inject, Signal } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ICartItem } from '../interfaces/cart/ICartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    DividerModule,
    TagModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  private readonly cartService: CartService = inject(CartService);
  readonly items: Signal<ICartItem[]> = this.cartService.items;
  readonly itemsCount: Signal<number> = this.cartService.itemsCount;
  readonly totalQuantity: Signal<number> = this.cartService.totalQuantity;
  readonly subtotal: Signal<number> = this.cartService.subtotal;
  readonly tax: Signal<number> = this.cartService.tax;
  readonly total: Signal<number> = this.cartService.total;
  readonly loading: Signal<boolean> = this.cartService.loading;
  promoCodeInput: string = '';

  onQuantityChange(productId: number, quantity: number | null): void {
    const safeQuantity: number = quantity ?? 1;
    this.cartService.updateQuantity(productId, safeQuantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  calculateItemTotal(price: number, quantity: number): number {
    return this.cartService.calculateItemTotal(price, quantity);
  }

  formatCurrency(value: number): string {
    return `$${ value.toFixed(2) }`;
  }
}
