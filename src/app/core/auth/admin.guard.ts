import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  if (localStorage.getItem('role') !== 'ADMIN') {
    return router.createUrlTree(['/']);
  }

  return true;
};
