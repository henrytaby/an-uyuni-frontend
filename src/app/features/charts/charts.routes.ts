import { Routes } from '@angular/router';
import { LineChartComponent } from './pages/line-chart/line-chart.component';
import { BarChartComponent } from './pages/bar-chart/bar-chart.component';

export const routes: Routes = [
  {
    path: 'line-chart',
    component: LineChartComponent,
    data: {
      title: 'Line Chart'
    }
  },
  {
    path: 'bar-chart',
    component: BarChartComponent,
    data: {
      title: 'Bar Chart'
    }
  }
];
