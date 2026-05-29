import { Routes } from '@angular/router';
import { MainLayout } from './components/layouts/main-layout/main-layout';
import { AuthLayout } from './components/layouts/auth-layout/auth-layout';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { authGuard } from './guards/auth-guard';

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
        path: 'profile',
        title: 'Profile Page',
        component: ProfilePage,
      },
      {
        path: 'about',
        title: 'About us',
        loadComponent: () => 
          import('./pages/about-us/about-us').then(
            (m) => m.AboutUs
          ),
      },
      {
        path: 'wishlist',
        title: 'wishlist',
        loadComponent: () => 
        import('./pages/wishlist/wishlist').then(
        (m) => m.Wishlist
      ),
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
    loadComponent: () => 
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  }
];
