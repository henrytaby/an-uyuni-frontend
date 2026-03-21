import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy,Component } from '@angular/core';

import { CardModule } from 'primeng/card';

import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-videos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageBreadcrumbComponent,
    CardModule,
    CommonModule
],
  templateUrl: './videos.component.html',
  styles: ``
})
export class VideosComponent {

}
