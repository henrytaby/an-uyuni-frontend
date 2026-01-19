import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../components/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../components/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../../components/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../../components/statics-chart/statics-chart.component';
import { RecentOrdersComponent } from '../../components/recent-orders/recent-orders.component';

@Component({
  selector: 'app-ecommerce',
  imports: [
    EcommerceMetricsComponent,
    MonthlySalesChartComponent,
    MonthlyTargetComponent,
    StatisticsChartComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './ecommerce.component.html',
})
export class EcommerceComponent {}
