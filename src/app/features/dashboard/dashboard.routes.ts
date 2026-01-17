import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/ecommerce.component').then(m => m.EcommerceComponent),
    title: 'Ecommerce Dashboard | Enterprise Admin'
  }
];
