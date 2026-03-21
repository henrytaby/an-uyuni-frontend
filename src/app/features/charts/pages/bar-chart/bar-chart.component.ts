import { ChangeDetectionStrategy,Component } from '@angular/core';

import { CardModule } from 'primeng/card';

import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';

import { BarChartOneComponent } from '@features/charts/components/bar/bar-chart-one/bar-chart-one.component';

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
