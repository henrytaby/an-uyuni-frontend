import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-badges',
  imports: [
    PageBreadcrumbComponent,
    CardModule,
    TagModule,
  ],
  templateUrl: './badges.component.html',
  styles: ``
})
export class BadgesComponent {

}
