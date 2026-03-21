import { ChangeDetectionStrategy,Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-images',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
