
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageBreadcrumbComponent } from '@shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-forms-overview',
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
