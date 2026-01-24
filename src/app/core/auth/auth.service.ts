import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError, throwError, Observable, of } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { TokenResponse, User, UserRole } from '../../features/auth/models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private router = inject(Router);

  private userSignal = signal<User | null>(null);
  private rolesSignal = signal<UserRole[]>([]);
  private tokenSignal = signal<string | null>(localStorage.getItem('access_token'));
  
  // Computed signals
  readonly currentUser = this.userSignal.asReadonly();
  readonly currentRoles = this.rolesSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  constructor() {
    // Attempt to restore session if token exists.
    // ConfigService is guaranteed to be ready because it uses HttpBackend and is loaded via APP_INITIALIZER
    if (this.tokenSignal()) {
      // Defer execution to allow AuthService to fully construct before AuthInterceptor tries to inject it
      setTimeout(() => this.refreshProfile(), 0);
    }
  }

  login(credentials: { username: string; password: string }): Observable<TokenResponse> {
    const config = this.configService.config();
    
    // Mock Auth for development if enabled
    if (config?.featureFlags?.mockAuth) {
      this.setSession('mock-access-token', 'mock-refresh-token');
      this.userSignal.set({ 
        id: 1, 
        username: credentials.username, 
        email: 'admin@example.com', 
        is_verified: true, 
        first_name: 'Mock', 
        last_name: 'Admin' 
      });
      return of({ access_token: 'mock-access-token', refresh_token: 'mock-refresh-token', token_type: 'bearer' });
    }

    const url = `${this.configService.apiUrl}/auth/login`;
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return this.http.post<TokenResponse>(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(response => {
        this.setSession(response.access_token, response.refresh_token);
      })
    );
  }

  logout() {
    const refreshToken = localStorage.getItem('refresh_token');
    const url = `${this.configService.apiUrl}/auth/logout`;

    if (refreshToken) {
      this.http.post(url, { refresh_token: refreshToken }).subscribe({
        next: () => this.clearSession(),
        error: () => this.clearSession() // Clear session anyway
      });
    } else {
      this.clearSession();
    }
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const url = `${this.configService.apiUrl}/auth/refresh`;
    const params = new HttpParams().set('refresh_token', refreshToken);

    return this.http.post<TokenResponse>(url, {}, { params }).pipe(
      tap(response => {
        this.setSession(response.access_token, response.refresh_token);
      }),
      catchError(err => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  private refreshProfile() {
    this.http.get<User>(`${this.configService.apiUrl}/auth/me`).subscribe({
      next: (user) => this.userSignal.set(user),
      error: (err) => {
        console.error('Error fetching profile:', err);
        if (err.status === 401 || err.status === 403) {
          this.logout();
        }
      }
    });

    this.http.get<UserRole[]>(`${this.configService.apiUrl}/auth/me/roles`).subscribe({
      next: (roles) => this.rolesSignal.set(roles)
    });
  }

  private setSession(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.tokenSignal.set(accessToken);
  }

  private clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.rolesSignal.set([]);
    this.router.navigate(['/signin']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
