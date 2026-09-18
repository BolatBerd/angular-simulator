import { Component, inject } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

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
    TagModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  private readonly cartService: CartService = inject(CartService);

  get items() {
    return this.cartService.items;
  }

  get itemsCount() {
    return this.cartService.itemsCount;
  }

  get totalQuantity() {
    return this.cartService.totalQuantity;
  }

  get subtotal() {
    return this.cartService.subtotal;
  }

  get tax() {
    return this.cartService.tax;
  }

  get total() {
    return this.cartService.total;
  }

  get loading() {
    return this.cartService.loading;
  }

  onQuantityChange(productId: number, quantity: number | null): void {
    const safeQuantity = quantity ?? 1;
    this.cartService.updateQuantity(productId, safeQuantity);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  calculateItemTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  formatCurrency(value: number): string {
    return `$${value.toFixed(2)}`;
  }
}
