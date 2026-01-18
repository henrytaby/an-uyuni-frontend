import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-page-breadcrumb',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './page-breadcrumb.component.html',
})
export class PageBreadcrumbComponent {
  pageTitle = input<string>('');
  items = input<BreadcrumbItem[]>([]);
}
