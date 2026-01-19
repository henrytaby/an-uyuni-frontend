import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
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
