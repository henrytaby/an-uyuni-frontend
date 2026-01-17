import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, tap, throwError, delay } from 'rxjs';
import { ConfigService } from '../config/config.service';

export interface User {
  username: string;
  email?: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  private userSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(localStorage.getItem('access_token'));

  readonly currentUser = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  login(credentials: { username: string; password: string }) {
    // Si mockAuth está habilitado, simulamos éxito para desarrollo
    const config = this.configService.config();
    if (config?.featureFlags.mockAuth) {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        this.setSession('mock-jwt-token-for-dev');
        return of({ access_token: 'mock-jwt-token-for-dev' }).pipe(delay(500));
      } else {
        return throwError(() => new Error('Credenciales inválidas (Mock Mode: admin/admin)'));
      }
    }

    const url = `${this.configService.apiUrl}/auth/login`;
    return this.http.post<{ access_token: string }>(url, credentials).pipe(
      tap(response => {
        this.setSession(response.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  private setSession(token: string) {
    localStorage.setItem('access_token', token);
    this.tokenSignal.set(token);
    // Aquí se podría decodear el JWT para setear el userSignal
    this.userSignal.set({ username: 'user_from_token' }); 
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
