import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly snackBar = inject(MatSnackBar)
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly total = computed(() => 
    this.items().reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity, 0
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
     
      this.snackBar.open('Product added to cart', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })

      return [...items, item]
    });
  }

  removeItem(id: string) {
    this.items.update(items => 
      items.filter(item => item.product.id !== id)
    )

    this.snackBar.open('Product removed from cart', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  clearCart() {
    this.items.set([])
    this.snackBar.open('Cart empty', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  increaseQuantity(id: string) {
    this.items.update(items => 
      items.map(i => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)
    );
  }

  decreaseQuantity(id: string) {
    this.items.update(items => 
      items
        .map(i => i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );
  }
}
