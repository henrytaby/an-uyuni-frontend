import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy,Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
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