import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SidebarService } from '@shared/services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backdrop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ],
  templateUrl: './backdrop.component.html',
})

export class BackdropComponent {
  private sidebarService = inject(SidebarService);
  readonly isMobileOpen = this.sidebarService.isMobileOpen;

  closeSidebar() {
    this.sidebarService.setMobileOpen(false);
  }
}
