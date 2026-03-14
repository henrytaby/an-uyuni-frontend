
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-invoice-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InvoiceTableComponent,
    ButtonModule
  ],
  templateUrl: './invoice-main.component.html',
  styles: ``
})
export class InvoiceMainComponent {

}
