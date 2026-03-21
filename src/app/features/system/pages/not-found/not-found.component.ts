import { Location } from '@angular/common';
import { ChangeDetectionStrategy,Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {
  private location = inject(Location);
  currentYear: number = new Date().getFullYear();

  goBack(): void {
    this.location.back();
  }
}
