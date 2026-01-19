import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  host: {
    'class': 'block w-full',
    'style': 'display: block !important;'
  }
})
export class DropdownItemComponent {
  @Input() to?: string;
  @Input() baseClassName = '';
  @Input() className = '';
  @Input() tag: 'a' | 'button' = 'button';
  @Output() itemClick = new EventEmitter<void>();

  private router = inject(Router);

  get combinedClasses(): string {
    return `${this.baseClassName} ${this.className}`.trim();
  }

  handleClick() {
    if (this.to) {
      this.router.navigateByUrl(this.to);
    }
    this.itemClick.emit();
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleClick();
      event.preventDefault();
    }
  }
}