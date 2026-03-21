
import { ChangeDetectionStrategy,Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { InvoiceTableComponent } from '../invoice-table/invoice-table.component';

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
