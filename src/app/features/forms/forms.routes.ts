import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/forms-overview.component').then(m => m.FormsOverviewComponent),
    title: 'Forms Overview | Enterprise Admin'
  }
];
