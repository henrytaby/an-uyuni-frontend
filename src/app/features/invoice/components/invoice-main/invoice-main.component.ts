
import { Component } from '@angular/core';
import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-invoice-main',
  imports: [
    InvoiceTableComponent,
    ButtonModule
  ],
  templateUrl: './invoice-main.component.html',
  styles: ``
})
export class InvoiceMainComponent {

}
