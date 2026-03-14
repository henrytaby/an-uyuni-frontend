import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InvoiceSidebarComponent } from '../../components/invoice-sidebar/invoice-sidebar.component';
import { InvoiceMainComponent } from '../../components/invoice-main/invoice-main.component';

@Component({
  selector: 'app-invoice-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageBreadcrumbComponent,
    InvoiceSidebarComponent,
    InvoiceMainComponent
  ],
  templateUrl: './invoice-overview.component.html',
  styles: ``
})
export class InvoiceOverviewComponent {

}
