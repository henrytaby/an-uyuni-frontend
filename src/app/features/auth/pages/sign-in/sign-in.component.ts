import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPageLayoutComponent } from '../../components/layout/auth-page-layout/auth-page-layout.component';
import { SigninFormComponent } from '../../components/signin-form/signin-form.component';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    AuthPageLayoutComponent,
    SigninFormComponent,
  ],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  handleSignIn(credentials: { username: string; password: string }) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login({
      username: credentials.username,
      password: credentials.password
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Credenciales no válidas. Inténtalo de nuevo.');
        console.error('Login error:', err);
      }
    });
  }

  clearErrorMessage() {
    this.errorMessage.set(null);
  }
}
