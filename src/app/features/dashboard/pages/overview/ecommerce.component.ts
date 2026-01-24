import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '@features/dashboard/components/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '@features/dashboard/components/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '@features/dashboard/components/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '@features/dashboard/components/statics-chart/statics-chart.component';
import { RecentOrdersComponent } from '@features/dashboard/components/recent-orders/recent-orders.component';

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
