import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-signup-form',
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    FloatLabelModule,
    DividerModule
  ],
  templateUrl: './signup-form.component.html',
  styles: `
    :host {
      display: flex;
      flex: 1;
      width: 100%;
    }
  `
})
export class SignupFormComponent {
  isLoading = signal(false);

  fname = '';
  lname = '';
  email = '';
  password = '';
  isChecked = false;

  onRegister() {
    this.isLoading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Registering:', { 
        fname: this.fname, 
        lname: this.lname, 
        email: this.email,
        password: this.password,
        terms: this.isChecked 
      });
    }, 1500);
  }
}
