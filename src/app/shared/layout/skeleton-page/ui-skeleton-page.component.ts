import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-ui-skeleton-page',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './ui-skeleton-page.component.html',
  styles: ``
})
export class UiSkeletonPageComponent {}
