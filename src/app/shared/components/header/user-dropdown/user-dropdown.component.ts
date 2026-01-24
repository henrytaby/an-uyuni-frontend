import { Component, signal, inject } from '@angular/core';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownItemComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  templateUrl: './user-dropdown.component.html',
  imports:[CommonModule,RouterModule,DropdownComponent,DropdownItemComponent]
})
export class UserDropdownComponent {
  private authService = inject(AuthService);
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