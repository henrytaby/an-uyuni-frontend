import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-images',
  imports: [
    PageBreadcrumbComponent,
    CardModule,
    ImageModule,
  ],
  templateUrl: './images.component.html',
  styles: ``
})
export class ImagesComponent {

}
