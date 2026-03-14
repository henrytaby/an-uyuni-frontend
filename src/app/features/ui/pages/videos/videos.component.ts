import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

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
