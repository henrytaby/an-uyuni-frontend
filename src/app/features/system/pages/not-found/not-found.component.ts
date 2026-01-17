import { Component } from '@angular/core';
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
  currentYear: number = new Date().getFullYear();

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
