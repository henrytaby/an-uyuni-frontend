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
        loadComponent: () => import('./features/dashboard/ecommerce/ecommerce.component').then(m => m.EcommerceComponent),
        pathMatch: 'full',
        title: 'Ecommerce Dashboard | Enterprise Admin'
      },
      {
        path: 'calendar',
        loadComponent: () => import('./features/calender/calender.component').then(m => m.CalenderComponent),
        title: 'Calender | Enterprise Admin'
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile | Enterprise Admin'
      },
      {
        path: 'form-elements',
        loadComponent: () => import('./features/forms/form-elements/form-elements.component').then(m => m.FormElementsComponent),
        title: 'Forms | Enterprise Admin'
      },
      {
        path: 'basic-tables',
        loadComponent: () => import('./features/tables/basic-tables/basic-tables.component').then(m => m.BasicTablesComponent),
        title: 'Tables | Enterprise Admin'
      },
      {
        path: 'blank',
        loadComponent: () => import('./features/blank/blank.component').then(m => m.BlankComponent),
        title: 'Blank | Enterprise Admin'
      },
      {
        path: 'invoice',
        loadComponent: () => import('./features/invoices/invoices.component').then(m => m.InvoicesComponent),
        title: 'Invoice | Enterprise Admin'
      },
      {
        path: 'line-chart',
        loadComponent: () => import('./features/charts/line-chart/line-chart.component').then(m => m.LineChartComponent),
        title: 'Line Chart | Enterprise Admin'
      },
      {
        path: 'bar-chart',
        loadComponent: () => import('./features/charts/bar-chart/bar-chart.component').then(m => m.BarChartComponent),
        title: 'Bar Chart | Enterprise Admin'
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/ui-elements/alerts/alerts.component').then(m => m.AlertsComponent),
        title: 'Alerts | Enterprise Admin'
      },
      {
        path: 'avatars',
        loadComponent: () => import('./features/ui-elements/avatar-element/avatar-element.component').then(m => m.AvatarElementComponent),
        title: 'Avatars | Enterprise Admin'
      },
      {
        path: 'badge',
        loadComponent: () => import('./features/ui-elements/badges/badges.component').then(m => m.BadgesComponent),
        title: 'Badges | Enterprise Admin'
      },
      {
        path: 'buttons',
        loadComponent: () => import('./features/ui-elements/buttons/buttons.component').then(m => m.ButtonsComponent),
        title: 'Buttons | Enterprise Admin'
      },
      {
        path: 'images',
        loadComponent: () => import('./features/ui-elements/images/images.component').then(m => m.ImagesComponent),
        title: 'Images | Enterprise Admin'
      },
      {
        path: 'videos',
        loadComponent: () => import('./features/ui-elements/videos/videos.component').then(m => m.VideosComponent),
        title: 'Videos | Enterprise Admin'
      },
    ]
  },
  {
    path: 'signin',
    loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
    title: 'Sign In | Enterprise Admin'
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/sign-up/sign-up.component').then(m => m.SignUpComponent),
    title: 'Sign Up | Enterprise Admin'
  },
  {
    path: '**',
    loadComponent: () => import('./features/other-page/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Not Found | Enterprise Admin'
  },
];
