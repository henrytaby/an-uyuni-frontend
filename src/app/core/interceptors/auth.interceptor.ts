import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take, Observable } from 'rxjs';
import { TokenResponse } from '../../features/auth/models/auth.models';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Build a smarter check to avoid loops: if the URL is the refresh URL, don't try to refresh again.
        if (req.url.includes('/auth/refresh') || req.url.includes('/auth/login')) {
             return throwError(() => error);
        }

        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((token: TokenResponse) => {
        isRefreshing = false;
        refreshTokenSubject.next(token.access_token);
        
        return next(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.access_token}`
          }
        }));
      }),
      catchError((err: unknown) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        return next(request.clone({
          setHeaders: {
            Authorization: `Bearer ${token!}`
          }
        }));
      })
    );
  }
}
