import { ChangeDetectionStrategy,Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
