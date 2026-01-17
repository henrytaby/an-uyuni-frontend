import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/overview/calendar.component').then(m => m.CalendarComponent),
    title: 'Calendar | Enterprise Admin'
  }
];
