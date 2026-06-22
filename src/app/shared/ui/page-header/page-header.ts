import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-page-header',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  private readonly router = inject(Router);
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
