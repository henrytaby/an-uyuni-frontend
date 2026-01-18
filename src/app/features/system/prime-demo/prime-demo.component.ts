import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prime-demo',
  standalone: true,
  imports: [CommonModule, ButtonModule, DatePickerModule, CardModule, FormsModule],
  template: `
    <div class="p-10 space-y-8 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">PrimeNG Integration Test</h1>
      
      <p-card header="Button Component" subheader="Verifying styles and ripple">
        <div class="flex gap-4 flex-wrap">
          <p-button label="Primary" />
          <p-button label="Secondary" severity="secondary" />
          <p-button label="Success" severity="success" />
          <p-button label="Danger" severity="danger" />
        </div>
      </p-card>

      <p-card header="DatePicker Component" subheader="Verifying interactivity and animations">
        <div class="flex flex-col gap-2">
            <label for="date" class="font-medium text-gray-700">Pick a Date</label>
            <p-datepicker [(ngModel)]="date" inputId="date" showIcon="true" />
            <p class="mt-2 text-sm text-gray-500">Selected: {{ date | date }}</p>
        </div>
      </p-card>

      <p-card header="Tailwind Integration" subheader="Checking utility classes">
        <div class="p-4 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
          This box uses Tailwind classes directly.
        </div>
      </p-card>
    </div>
  `
})
export class PrimeDemoComponent {
  date: Date | undefined;
}
