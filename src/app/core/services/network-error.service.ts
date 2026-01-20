import { Injectable, signal, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkErrorService {
  private zone = inject(NgZone);
  private http = inject(HttpClient);
  
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

  checkConnection(): Observable<boolean> {
    // Ping to a lightweight asset (favicon or root) to check visibility
    // Using CSS to avoid CORS issues if different domain, but here app is same origin
    return this.http.head('/favicon.ico', { responseType: 'blob' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
