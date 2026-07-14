import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../features/cart/cart.service';

@Component({
  selector: 'app-page-header',
  imports: [MatIcon, RouterLink, RouterLinkActive, MatBadgeModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  private readonly cartService = inject(CartService);
  
  readonly cartCount = computed(() => 
    this.cartService.cartItems().reduce((sum, item) => sum + item.quantity, 0)  
  )
}
