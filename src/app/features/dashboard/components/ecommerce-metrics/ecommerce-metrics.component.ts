import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-ecommerce-metrics',
  imports: [TagModule],
  templateUrl: './ecommerce-metrics.component.html'
})
export class EcommerceMetricsComponent {
  // No custom icons needed, using PrimeIcons
}
