import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-badges',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    TagModule,
  ],
  templateUrl: './badges.component.html',
  styles: ``
})
export class BadgesComponent {

}
