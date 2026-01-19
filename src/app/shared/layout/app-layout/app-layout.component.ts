import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderComponent,
    AppSidebarComponent,
    BackdropComponent
  ],
  templateUrl: './app-layout.component.html',
})

export class AppLayoutComponent {
  private sidebarService = inject(SidebarService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  readonly isExpanded = this.sidebarService.isExpanded;
  readonly isHovered = this.sidebarService.isHovered;
  readonly isMobileOpen = this.sidebarService.isMobileOpen;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
