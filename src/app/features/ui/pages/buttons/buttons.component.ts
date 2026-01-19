import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buttons',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    ButtonModule,
  ],
  templateUrl: './buttons.component.html',
  styles: ``
})
export class ButtonsComponent {

}
