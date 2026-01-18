import { Component, inject, signal, computed } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleButtonComponent } from '../../components/common/theme-toggle/theme-toggle-button.component';
import { NotificationDropdownComponent } from '../../components/header/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../../components/header/user-dropdown/user-dropdown.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface UserRole {
  label: string;
  value: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleButtonComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  isApplicationMenuOpen = false;
  isRoleModalVisible = signal(false);
  roleSearchQuery = signal('');

  public sidebarService = inject(SidebarService);
  readonly isMobileOpen$ = this.sidebarService.isMobileOpen$;

  roles = signal<UserRole[]>([
    { label: 'Administrador', value: 'admin', icon: 'pi pi-shield', description: 'Acceso total al sistema' },
    { label: 'Ventas', value: 'sales', icon: 'pi pi-shopping-cart', description: 'Gestión de facturación y pedidos' },
    { label: 'Gestor de información', value: 'manager', icon: 'pi pi-database', description: 'Administración de catálogos' },
    { label: 'Analista de Datos', value: 'analyst', icon: 'pi pi-chart-bar', description: 'Visualización de reportes' },
    { label: 'Soporte Técnico', value: 'support', icon: 'pi pi-cog', description: 'Resolución de incidencias' },
    { label: 'Auditor Externo', value: 'auditor', icon: 'pi pi-search', description: 'Revisión de logs y auditoría' },
    { label: 'Recursos Humanos', value: 'hr', icon: 'pi pi-users', description: 'Gestión de personal' },
  ]);

  selectedRole = signal<UserRole>(this.roles()[0]);

  filteredRoles = computed(() => {
    const query = this.roleSearchQuery().toLowerCase();
    return this.roles().filter(role => 
      role.label.toLowerCase().includes(query) || 
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
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  showRoleModal() {
    this.roleSearchQuery.set('');
    this.isRoleModalVisible.set(true);
  }

  selectRole(role: UserRole) {
    this.selectedRole.set(role);
    this.isRoleModalVisible.set(false);
  }
}
