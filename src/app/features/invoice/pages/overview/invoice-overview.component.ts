import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InvoiceSidebarComponent } from '../../components/invoice-sidebar/invoice-sidebar.component';
import { InvoiceMainComponent } from '../../components/invoice-main/invoice-main.component';

@Component({
  selector: 'app-invoice-overview',
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
