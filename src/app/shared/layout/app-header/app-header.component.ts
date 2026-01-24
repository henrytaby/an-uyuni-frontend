import { Component, inject, signal, computed } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from '../../components/header/theme-toggle/theme-toggle-button.component';
import { UserDropdownComponent } from '../../components/header/user-dropdown/user-dropdown.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';

import { UserRole } from '../../../features/auth/models/auth.models';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleButtonComponent,
    UserDropdownComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule
  ],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  isApplicationMenuOpen = signal(false);
  isRoleModalVisible = signal(false);
  roleSearchQuery = signal('');

  public sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  
  readonly isMobileOpen = this.sidebarService.isMobileOpen;

  // Use roles from AuthService
  roles = this.authService.currentRoles;

  // Active Role is managed globally by AuthService
  selectedRole = this.authService.activeRole;

  filteredRoles = computed(() => {
    const query = this.roleSearchQuery().toLowerCase();
    return this.roles().filter(role => 
      role.name.toLowerCase().includes(query) || 
      role.description?.toLowerCase().includes(query)
    );
  });

  handleToggle() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) {
        this.sidebarService.toggleExpanded();
      } else {
        this.sidebarService.toggleMobileOpen();
      }
    }
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen.update(prev => !prev);
  }

  showRoleModal() {
    this.authService.fetchRoles();
    this.roleSearchQuery.set('');
    this.isRoleModalVisible.set(true);
  }

  selectRole(role: UserRole) {
    this.authService.setActiveRole(role);
    this.isRoleModalVisible.set(false);
  }
}
