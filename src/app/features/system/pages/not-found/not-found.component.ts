import { Component, inject } from '@angular/core';
import { GridShapeComponent } from '../../../../shared/components/common/grid-shape/grid-shape.component';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    GridShapeComponent,
    RouterModule,
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
