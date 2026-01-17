import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { SigninFormComponent } from '../../../shared/components/auth/signin-form/signin-form.component';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    AuthPageLayoutComponent,
    SigninFormComponent,
  ],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleSignIn(credentials: any) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login({
      username: credentials.email, // Ajustar según lo que el backend de FastAPI espere
      password: credentials.password
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set('Credenciales no válidas. Inténtalo de nuevo.');
        console.error('Login error:', err);
      }
    });
  }
}
