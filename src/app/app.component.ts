import { ChangeDetectionStrategy,Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private loadingService = inject(LoadingService);
  
  readonly isLoading = computed(() => this.loadingService.isLoading() && !this.loadingService.isNavigating());
  
  title = 'Angular Ecommerce Dashboard | UyuniAdmin';
}
