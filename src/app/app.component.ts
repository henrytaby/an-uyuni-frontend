import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  standalone: true,
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
