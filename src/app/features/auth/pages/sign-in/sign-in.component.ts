import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthPageLayoutComponent } from '@features/auth/components/layout/auth-page-layout/auth-page-layout.component';
import { SigninFormComponent } from '@features/auth/components/signin-form/signin-form.component';
import { AuthService } from '@core/auth/auth.service';

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
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        console.error('Login error:', err);

        if (err.status === 403 && err.error?.detail?.code === 'ACCOUNT_LOCKED') {
          const detail = err.error.detail;
          const minutes = Math.ceil(detail.wait_seconds / 60);
           this.errorMessage.set(`Cuenta bloqueada tras ${detail.max_attempts} intentos fallidos. Inténtalo de nuevo en ${minutes} minutos.`);
        } else if (err.status === 401) {
           this.errorMessage.set('Usuario o contraseña incorrectos.');
        } else {
           this.errorMessage.set('No se pudo conectar con el servidor. Por favor, inténtalo más tarde.');
        }
      }
    });
  }

  clearErrorMessage() {
    this.errorMessage.set(null);
  }
}
