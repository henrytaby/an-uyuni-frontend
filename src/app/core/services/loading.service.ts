import { Injectable, signal, inject, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnDestroy {
  private router = inject(Router);
  
  // Signals para el estado global
  readonly isNavigating = signal(false);
  readonly isLoading = signal(false);

  // Contador de peticiones activas (más robusto que Set para condiciones de carrera)
  private activeRequestCount = 0;
  
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private debounceId: ReturnType<typeof setTimeout> | null = null;
  private routerSubscription: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
        // Safety: Reset HTTP loader on EVERY navigation start globally
        this.forceReset();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isNavigating.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }



  showLoader() {
    this.activeRequestCount++;
    // console.debug(`[LoadingService] showLoader: count=${this.activeRequestCount}`);
    
    if (this.activeRequestCount === 1) {
      this.clearDebounce();
      
      this.debounceId = setTimeout(() => {
        if (this.activeRequestCount > 0) {
          // console.debug('[LoadingService] Setting isLoading=true');
          this.isLoading.set(true);
          this.startFailSafeTimer();
        }
      }, 300);
    }
  }

  hideLoader() {
    this.activeRequestCount = Math.max(0, this.activeRequestCount - 1);
    // console.debug(`[LoadingService] hideLoader: count=${this.activeRequestCount}`);

    if (this.activeRequestCount === 0) {
      this.stopLoadingState();
    }
  }

  private stopLoadingState() {
    // console.debug('[LoadingService] Setting isLoading=false');
    this.isLoading.set(false);
    this.clearDebounce();
    this.clearFailSafe();
  }

  forceReset() {
    // console.debug('[LoadingService] forceReset called');
    this.activeRequestCount = 0;
    this.isLoading.set(false);
    this.clearDebounce();
    this.clearFailSafe();
  }

  private clearDebounce() {
    if (this.debounceId) {
      clearTimeout(this.debounceId);
      this.debounceId = null;
    }
  }

  private clearFailSafe() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private startFailSafeTimer() {
    this.clearFailSafe();
    // Fail-safe: Si el loader se queda pegado más de 6 segundos (reducido para mejor UX), lo reseteamos
    this.timeoutId = setTimeout(() => {
      if (this.isLoading()) {
        console.warn('[LoadingService] Fail-safe triggered. Forcing reset.');
        this.forceReset();
      }
    }, 6000);
  }
}
