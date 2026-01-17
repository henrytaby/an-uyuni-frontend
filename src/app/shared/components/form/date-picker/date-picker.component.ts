
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import flatpickr from 'flatpickr';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-date-picker',
  imports: [LabelComponent],
  templateUrl: './date-picker.component.html',
  styles: ``
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {

  @Input() id!: string;
  @Input() mode: 'single' | 'multiple' | 'range' | 'time' = 'single';
  @Input() defaultDate?: string | Date | string[] | Date[];
  @Input() label?: string;
  @Input() placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() dateChange = new EventEmitter<any>();

  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>;

  private flatpickrInstance: flatpickr.Instance | undefined;

  ngAfterViewInit() {
    if (this.dateInput && this.dateInput.nativeElement) {
      try {
        this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
          mode: this.mode,
          static: true,
          monthSelectorType: 'static',
          dateFormat: 'Y-m-d',
          defaultDate: this.defaultDate,
          onChange: (selectedDates, dateStr, instance) => {
            this.dateChange.emit({ selectedDates, dateStr, instance });
          }
        });
      } catch (e) {
        console.error('Error initializing flatpickr:', e);
      }
    }
  }

  ngOnDestroy() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }
}
