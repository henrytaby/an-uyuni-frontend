import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  readonly isExpanded = signal<boolean>(true);
  readonly isMobileOpen = signal<boolean>(false);
  readonly isHovered = signal<boolean>(false);

  setExpanded(val: boolean) {
    this.isExpanded.set(val);
  }

  toggleExpanded() {
    this.isExpanded.update(prev => !prev);
  }

  setMobileOpen(val: boolean) {
    this.isMobileOpen.set(val);
  }

  toggleMobileOpen() {
    this.isMobileOpen.update(prev => !prev);
  }

  setHovered(val: boolean) {
    this.isHovered.set(val);
  }
}
