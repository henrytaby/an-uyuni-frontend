
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InvoiceItem } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-table',
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './invoice-table.component.html',
  styles: ``
})
export class InvoiceTableComponent {

  rows = signal<InvoiceItem[]>([
    { sno: 1, product: 'Macbook pro 13”', qty: 1, unitCost: '$1,200', discount: '0%', total: '$1,200' },
    { sno: 2, product: 'Apple Watch Ultra', qty: 1, unitCost: '$300', discount: '50%', total: '$150' },
    { sno: 3, product: 'iPhone 15 Pro Max', qty: 3, unitCost: '$800', discount: '0%', total: '$1,600' },
    { sno: 4, product: 'iPad Pro 3rd Gen', qty: 1, unitCost: '$900', discount: '0%', total: '$900' },
  ]);

}
