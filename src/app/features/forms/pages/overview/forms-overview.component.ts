
import { ChangeDetectionStrategy,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-forms-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageBreadcrumbComponent,
    FormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    ToggleSwitchModule,
    FileUploadModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    DatePickerModule,
    InputGroupModule,
    InputGroupAddonModule,
    FluidModule
  ],
  templateUrl: './forms-overview.component.html',
  styles: ``
})
export class FormsOverviewComponent {
  // Inputs
  textValue = '';
  numberValue: number | null = null;
  dateValue: Date | null = null;
  textareaValue = '';
  
  // Selects
  selectedCity: string | null = null;
  cities = [
      { name: 'Nueva York', code: 'NY' },
      { name: 'Roma', code: 'RM' },
      { name: 'Londres', code: 'LDN' },
      { name: 'Estambul', code: 'IST' },
      { name: 'París', code: 'PRS' }
  ];

  // Checkboxes
  checked = false;
  selectedCategories: string[] = [];
  
  // Radio
  selectedOption = '';
  
  // Toggle
  toggleValue = false;
  
  // File Upload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload(event: any) {
     console.log(event);
  }
}
