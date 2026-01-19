import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    CommonModule
  ],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {

}
