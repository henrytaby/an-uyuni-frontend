import { Injectable, signal, inject, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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
    // Forzamos el reset en cualquier evento importante de navegación
    this.routerSubscription = this.router.events.pipe(
      filter(event => 
        event instanceof NavigationStart || 
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      )
    ).subscribe(() => {
      this.forceReset();
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  setNavigating(value: boolean) {
    this.isNavigating.set(value);
  }

  showLoader() {
    this.activeRequestCount++;
    
    // Si es la primera petición, iniciamos el debounce
    if (this.activeRequestCount === 1) {
      this.clearDebounce();
      
      this.debounceId = setTimeout(() => {
        if (this.activeRequestCount > 0) {
          this.isLoading.set(true);
          this.startFailSafeTimer();
        }
      }, 300); // 300ms de gracia para peticiones rápidas
    }
  }

  hideLoader() {
    this.activeRequestCount = Math.max(0, this.activeRequestCount - 1);

    if (this.activeRequestCount === 0) {
      this.stopLoadingState();
    }
  }

  /**
   * Limpia el estado de carga pero mantiene el contador si fuera necesario.
   * Usado internamente al terminar peticiones normales.
   */
  private stopLoadingState() {
    this.isLoading.set(false);
    this.clearDebounce();
    this.clearFailSafe();
  }

  /**
   * LIMPIEZA TOTAL: Resetea contadores y estados.
   * Invocado en navegaciones o errores críticos.
   */
  forceReset() {
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
