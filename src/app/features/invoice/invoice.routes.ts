import { Routes } from '@angular/router';
import { InvoiceOverviewComponent } from './pages/overview/invoice-overview.component';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceOverviewComponent,
    data: {
      title: 'Invoice Overview'
    }
  }
];
