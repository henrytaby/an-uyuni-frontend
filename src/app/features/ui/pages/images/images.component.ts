import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from './../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-images',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    ImageModule,
  ],
  templateUrl: './images.component.html',
  styles: ``
})
export class ImagesComponent {

}
