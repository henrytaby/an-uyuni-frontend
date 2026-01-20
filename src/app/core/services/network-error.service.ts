import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkErrorService {
  private zone = inject(NgZone);
  readonly showConnectionError = signal(false);

  triggerConnectionError() {
    // Ensure we run inside Angular Zone to trigger UI updates
    this.zone.run(() => {
        this.showConnectionError.set(true);
    });
  }

  resetError() {
    this.showConnectionError.set(false);
  }
}
