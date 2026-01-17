import { Component } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-alerts',
  imports: [
    AlertComponent,
    ComponentCardComponent,
    PageBreadcrumbComponent,
  ],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {

}
