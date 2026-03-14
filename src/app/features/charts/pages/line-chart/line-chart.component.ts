import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { LineChartOneComponent } from '../../components/line/line-chart-one/line-chart-one.component';

@Component({
  selector: 'app-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageBreadcrumbComponent,
    CardModule,
    LineChartOneComponent
],
  templateUrl: './line-chart.component.html',
  styles: ``
})
export class LineChartComponent {

}
