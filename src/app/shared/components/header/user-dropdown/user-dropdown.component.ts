import { Component, signal, inject, computed } from '@angular/core';
import { DropdownComponent } from '@shared/components/ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownItemComponent } from '@shared/components/ui/dropdown/dropdown-item/dropdown-item.component';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  templateUrl: './user-dropdown.component.html',
  imports:[CommonModule,RouterModule,DropdownComponent,DropdownItemComponent]
})
export class UserDropdownComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    const first = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
    const last = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
    return `${first}${last}`;
  });

  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update(prev => !prev);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  handleLogout() {
    this.authService.logout();
    this.closeDropdown();
  }
}