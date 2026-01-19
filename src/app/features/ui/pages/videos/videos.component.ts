import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    CommonModule
],
  templateUrl: './videos.component.html',
  styles: ``
})
export class VideosComponent {

}
