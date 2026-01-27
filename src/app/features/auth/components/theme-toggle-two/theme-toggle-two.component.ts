import { Component, inject } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';


import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-toggle-two',
  imports: [ButtonModule],
  templateUrl: './theme-toggle-two.component.html',
  styles: ``
})
export class ThemeToggleTwoComponent {

  private themeService = inject(ThemeService);
  theme$ = this.themeService.theme$;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
