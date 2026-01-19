import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-avatar-element',
  imports: [
    AvatarModule,
    ComponentCardComponent,
    PageBreadcrumbComponent,
    BadgeModule
  ],
  templateUrl: './avatar-element.component.html',
  styles: ``
})
export class AvatarElementComponent {

}
