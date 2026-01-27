import { Component, inject } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  imports:[CommonModule, ButtonModule]
})
export class ThemeToggleButtonComponent {
  
  private themeService = inject(ThemeService);
  theme$ = this.themeService.theme$;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}