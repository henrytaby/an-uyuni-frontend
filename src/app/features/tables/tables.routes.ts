import { Routes } from '@angular/router';
import { TablesOverviewComponent } from './pages/overview/tables-overview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: TablesOverviewComponent,
    data: {
      title: 'Tables Overview'
    }
  }
];
