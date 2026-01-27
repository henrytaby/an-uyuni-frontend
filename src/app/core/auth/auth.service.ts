import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError, throwError, Observable, of } from 'rxjs';
import { ConfigService } from '@core/config/config.service';
import { TokenResponse, User, UserRole } from '@features/auth/models/auth.models';
import { MenuGroup } from '@core/models/menu.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private router = inject(Router);

  // State Signals
  private userSignal = signal<User | null>(null);
  private rolesSignal = signal<UserRole[]>([]);
  private tokenSignal = signal<string | null>(localStorage.getItem('access_token'));
  private activeRoleSignal = signal<UserRole | null>(null);
  
  // Computed signals
  readonly currentUser = this.userSignal.asReadonly();
  readonly currentRoles = this.rolesSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly activeRole = this.activeRoleSignal.asReadonly();
  
  private menuSignal = signal<MenuGroup[]>([]);
  readonly currentMenu = this.menuSignal.asReadonly();

  private loadingRolesSignal = signal<boolean>(false);
  readonly isLoadingRoles = this.loadingRolesSignal.asReadonly();

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
        // Immediately fetch profile and roles to populate UI state signals
        this.refreshProfile();
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

  fetchRoles() {
    this.loadingRolesSignal.set(true);
    this.http.get<UserRole[]>(`${this.configService.apiUrl}/auth/me/roles`).subscribe({
      next: (roles) => {
        this.rolesSignal.set(roles);
        
        // Handle Active Role Persistence
        if (roles.length > 0) {
          const storedSlug = localStorage.getItem('active_role_slug');
          const matchedRole = roles.find(r => r.slug === storedSlug);

          if (matchedRole) {
            this.setActiveRole(matchedRole, false);
          } else {
            // Default to first role if no stored slug or mismatch
            this.setActiveRole(roles[0], false);
          }
        } else {
          this.activeRoleSignal.set(null);
        }
        this.loadingRolesSignal.set(false);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
        this.loadingRolesSignal.set(false);
      }
    });
  }

  setActiveRole(role: UserRole, navigate = true) {
    this.activeRoleSignal.set(role);
    localStorage.setItem('active_role_slug', role.slug);
    this.fetchMenu(role.slug);
    if (navigate) {
      this.router.navigate(['/']);
    }
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

    this.fetchRoles();
  }

  private setSession(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    this.tokenSignal.set(accessToken);
  }

  private clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('active_role_slug');
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.rolesSignal.set([]);
    this.activeRoleSignal.set(null);
    this.menuSignal.set([]);
    this.router.navigate(['/signin']);
  }

  fetchMenu(roleSlug: string) {
    this.http.get<MenuGroup[]>(`${this.configService.apiUrl}/auth/me/menu/${roleSlug}`).subscribe({
      next: (menu) => {
        this.menuSignal.set(menu);
      },
      error: (err) => {
        console.error('Error fetching menu:', err);
        this.menuSignal.set([]);
      }
    });
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
}
