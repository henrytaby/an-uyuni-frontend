import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-signin-form',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    MessageModule
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
  @Output() signIn = new EventEmitter<{ username: string; password: string }>();
  @Output() errorCleared = new EventEmitter<void>();
  
  isLoading = input<boolean>(false);
  errorMessage = input<string | null>(null);

  username = '';
  password = '';

  onSignIn() {
    if (!this.username || !this.password) {
       this.localError = 'Por favor, ingrese su usuario y contraseña.';
    }
    
    if (this.username && this.password) {
      this.signIn.emit({ username: this.username, password: this.password });
    }
  }

  localError: string | null = null;

  clearError() {
    this.localError = null;
    this.errorCleared.emit();
  }
}
