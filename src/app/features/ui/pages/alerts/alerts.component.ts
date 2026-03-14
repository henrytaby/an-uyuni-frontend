import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
