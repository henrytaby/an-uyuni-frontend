import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  readonly isNavigating = signal(false);
  readonly isLoading = signal(false);

  private activeUrls = new Set<string>();
  
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private debounceId: ReturnType<typeof setTimeout> | null = null;

  setNavigating(value: boolean) {
    this.isNavigating.set(value);
  }

  showLoader(url?: string) {
    const requestKey = url || `req-${Math.random()}`; 
    this.activeUrls.add(requestKey);
    
    if (this.activeUrls.size === 1) {
      if (this.debounceId) clearTimeout(this.debounceId);
      
      this.debounceId = setTimeout(() => {
        if (this.activeUrls.size > 0) {
          this.isLoading.set(true);
          this.startFailSafeTimer();
        }
      }, 300);
    }
  }

  hideLoader(url?: string) {
    if (url) {
      this.activeUrls.delete(url);
    } else {
       console.warn('[Loader] hideLoader called without URL.');
    }

    if (this.activeUrls.size <= 0) {
      this.resetLoader();
    }
  }

  resetLoader() {
    this.activeUrls.clear();
    this.isLoading.set(false);
    
    if (this.debounceId) {
      clearTimeout(this.debounceId);
      this.debounceId = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private startFailSafeTimer() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    // Fail-safe: Si el loader se queda pegado más de 10 segundos, lo reseteamos
    this.timeoutId = setTimeout(() => {
      if (this.isLoading()) {
        console.warn('Loading fail-safe triggered. Stuck requests:', Array.from(this.activeUrls));
        this.resetLoader();
      }
    }, 10000);
  }
}
