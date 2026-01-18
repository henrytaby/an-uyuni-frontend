import { Routes } from '@angular/router';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.routes').then(m => m.routes),
      },
      {
        path: 'calendar',
        loadChildren: () => import('./features/calendar/calendar.routes').then(m => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./features/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./features/tables/tables.routes').then(m => m.routes),
      },
      {
        path: 'charts',
        loadChildren: () => import('./features/charts/charts.routes').then(m => m.routes),
      },
      {
        path: 'blank',
        loadComponent: () => import('./features/system/pages/blank/blank.component').then(m => m.BlankComponent),
        title: 'Blank | Enterprise Admin'
      },
      {
        path: 'invoice',
        loadChildren: () => import('./features/invoice/invoice.routes').then(m => m.routes),
      },

      {
        path: 'ui',
        loadChildren: () => import('./features/ui/ui.routes').then(m => m.routes),
      },
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'prime-demo',
    loadComponent: () => import('./features/system/prime-demo/prime-demo.component').then(m => m.PrimeDemoComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/system/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Not Found | Enterprise Admin'
  },
];
