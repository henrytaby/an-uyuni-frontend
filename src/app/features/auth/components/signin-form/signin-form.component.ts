import { Component, EventEmitter, Output, input } from '@angular/core';
import { LabelComponent } from '../../../../shared/components/form/label/label.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputFieldComponent } from '../../../../shared/components/form/input/input-field.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    ButtonComponent,
    InputFieldComponent,
    FormsModule
  ],
  templateUrl: './signin-form.component.html',
  styles: `
    :host {
      display: flex;
      flex: 1;
      width: 100%;
    }
  `
})
export class SigninFormComponent {
  @Output() signIn = new EventEmitter<{ email: string; password: string }>();
  
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);

  showPassword = false;

  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    if (this.email && this.password) {
      this.signIn.emit({ email: this.email, password: this.password });
    }
  }
}
