import { Routes } from '@angular/router';
import { MainLayout } from './shared/ui/main-layout/main-layout';
import { AuthLayout } from './shared/ui/auth-layout/auth-layout';
import { HomePage } from './features/home/home-page';
import { LoginPage } from './features/auth/login-page/login-page';
import { CatalogPage } from './features/catalog/catalog-page';
import { ProfilePage } from './features/profile/profile-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        title: 'Home Page',
        component: HomePage,
      },
      {
        path: 'catalog',
        title: 'Catalog Page',
        component: CatalogPage,
      },
      {
        path: 'cart',
        title: 'Cart',
        loadComponent: () =>
          import('./features/cart/cart-page').then((m) => m.CartPage),
      },
      {
        path: 'product/:slug',
        title: 'Product Details',
        loadComponent: () => 
          import('./features/product-details/product-details-page').then(
            (m) => m.ProductDetailsPage
          ),
      },
      {
        path: 'profile',
        title: 'Profile Page',
        component: ProfilePage,
      },
      {
        path: 'about',
        title: 'About us',
        loadComponent: () => import('./features/about/about-page').then((m) => m.AboutPage),
      },
      {
        path: 'wishlist',
        title: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist-page').then((m) => m.WishlistPage),
      },
    ],
  },
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {
        path: '',
        title: 'Login Page',
        component: LoginPage,
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
