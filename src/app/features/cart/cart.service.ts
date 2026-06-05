import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly total = computed(() => 
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity, 0
    )
  )

  addItem(item: CartItem) {
    this.items.update(items => {
      const existing = items.find(i => i.product.id === item.product.id)

      if (existing) {
        return items.map(i => 
          i.product.id === item.product.id
            ? {...i, quantity: i.quantity + 1} : i
        )
      }

      return [...items, item]
    });
  }

  removeItem(id: string) {
    this.items.update(items => 
      items.filter(item => item.product.id !== id)
    )
  }

  clearCart() {
    this.items.set([])
  }
}
