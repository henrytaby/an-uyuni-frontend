import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [
    CardModule,
    PageBreadcrumbComponent,
    CommonModule
  ],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {

}
