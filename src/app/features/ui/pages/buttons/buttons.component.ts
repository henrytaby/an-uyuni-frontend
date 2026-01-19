import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-buttons',
  imports: [
    CardModule,
    PageBreadcrumbComponent,
    ButtonModule,
  ],
  templateUrl: './buttons.component.html',
  styles: ``
})
export class ButtonsComponent {

}
