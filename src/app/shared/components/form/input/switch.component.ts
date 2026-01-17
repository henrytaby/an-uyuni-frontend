import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [
    CommonModule
  ],
  template: `
   <button
      type="button"
      role="switch"
      [attr.aria-checked]="isChecked"
      [attr.aria-label]="label"
      class="flex cursor-pointer select-none items-center gap-3 text-sm font-medium bg-transparent border-0 p-0"
      [ngClass]="disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-400'"
      (click)="handleToggle()"
      [disabled]="disabled"
    >
      <div class="relative pointer-events-none">
        <div
          class="block transition duration-150 ease-linear h-6 w-11 rounded-full"
          [ngClass]="
            (disabled
              ? 'bg-gray-100 dark:bg-gray-800'
              : switchColors.background)
          "
        ></div>
        <div
          class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform"
          [ngClass]="switchColors.knob"
        ></div>
      </div>
      {{ label }}
    </button>
  `
})
export class SwitchComponent implements OnInit {

  @Input() label!: string;
  @Input() defaultChecked = false;
  @Input() disabled = false;
  @Input() color: 'blue' | 'gray' = 'blue';

  @Output() valueChange = new EventEmitter<boolean>();

  isChecked = false;

  ngOnInit() {
    this.isChecked = this.defaultChecked;
  }

  handleToggle() {
    if (this.disabled) return;
    this.isChecked = !this.isChecked;
    this.valueChange.emit(this.isChecked);
  }

  get switchColors() {
    if (this.color === 'blue') {
      return {
        background: this.isChecked
          ? 'bg-brand-500'
          : 'bg-gray-200 dark:bg-white/10',
        knob: this.isChecked
          ? 'translate-x-full bg-white'
          : 'translate-x-0 bg-white',
      };
    } else {
      return {
        background: this.isChecked
          ? 'bg-gray-800 dark:bg-white/10'
          : 'bg-gray-200 dark:bg-white/10',
        knob: this.isChecked
          ? 'translate-x-full bg-white'
          : 'translate-x-0 bg-white',
      };
    }
  }
}
