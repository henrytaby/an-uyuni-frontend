import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BasicTableOneComponent } from '@features/tables/components/basic-table-one/basic-table-one.component';
import { BasicTableThreeComponent } from '@features/tables/components/basic-table-three/basic-table-three.component';
import { BasicTableFourComponent } from '@features/tables/components/basic-table-four/basic-table-four.component';
import { BasicTableFiveComponent } from '@features/tables/components/basic-table-five/basic-table-five.component';

@Component({
  selector: 'app-tables-overview',
  imports: [
    CardModule,
    PageBreadcrumbComponent,
    BasicTableOneComponent,
    BasicTableThreeComponent,
    BasicTableFourComponent,
    BasicTableFiveComponent,
  ],
  templateUrl: './tables-overview.component.html',
  styles: ``
})
export class TablesOverviewComponent {

}
