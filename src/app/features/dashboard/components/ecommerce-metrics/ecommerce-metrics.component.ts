import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-ecommerce-metrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagModule],
  templateUrl: './ecommerce-metrics.component.html'
})
export class EcommerceMetricsComponent {
  // No custom icons needed, using PrimeIcons
}
