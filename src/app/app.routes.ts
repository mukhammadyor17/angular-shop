import { Routes } from '@angular/router';
import { MainLayout } from './shared/ui/main-layout/main-layout';
import { HomePage } from './features/home/home-page';

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
        loadComponent: () => import('./features/catalog/catalog-page').then((m) => m.CatalogPage),
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
        loadComponent: () => import('./features/profile/profile-page').then((m) => m.ProfilePage),
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
    title: 'Login Page',
    loadComponent: () => import('./features/auth/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    title: 'Register Page',
    loadComponent: () =>
      import('./features/auth/register-page/register-page').then((m) => m.RegisterPage),
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
