import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-badges',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
