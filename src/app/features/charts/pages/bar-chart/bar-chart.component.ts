import { Component } from '@angular/core';
import { BarChartOneComponent } from '../../components/bar/bar-chart-one/bar-chart-one.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-bar-chart',
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
