import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BarChartOneComponent } from '@features/charts/components/bar/bar-chart-one/bar-chart-one.component';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardModule,
    PageBreadcrumbComponent,
    BarChartOneComponent
],
  templateUrl: './bar-chart.component.html',
  styles: ``
})
export class BarChartComponent {

}
