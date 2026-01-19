import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { LoadingService } from '../../../core/services/loading.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UiSkeletonPageComponent } from '../skeleton-page/ui-skeleton-page.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderComponent,
    AppSidebarComponent,
    BackdropComponent,
    ProgressBarModule,
    BlockUIModule,
    ProgressSpinnerModule,
    UiSkeletonPageComponent
  ],
  templateUrl: './app-layout.component.html',
})

export class AppLayoutComponent {
  private sidebarService = inject(SidebarService);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private loadingService = inject(LoadingService);

  readonly isExpanded = this.sidebarService.isExpanded;
  readonly isHovered = this.sidebarService.isHovered;
  readonly isMobileOpen = this.sidebarService.isMobileOpen;

  readonly isNavigating = this.loadingService.isNavigating;
  readonly isLoading = this.loadingService.isLoading;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.setNavigating(true);
        // Safety: Reset HTTP loader on new navigation to prevent stuck previous requests
        this.loadingService.resetLoader();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.setNavigating(false);
        if (event instanceof NavigationEnd) {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      }
    });
  }
}
