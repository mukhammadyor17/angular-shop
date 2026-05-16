import { Routes } from '@angular/router';
import { MainLayout } from './components/layouts/main-layout/main-layout';
import { AuthLayout } from './components/layouts/auth-layout/auth-layout';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';

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
    redirectTo: '',
  },
];
