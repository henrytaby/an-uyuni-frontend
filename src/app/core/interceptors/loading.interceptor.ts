import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // No bloquear la UI para peticiones irrelevantes (assets, svg, json, etc)
  const nonBlockingExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.css', '.js', '.json', '.woff', '.woff2', 'manifest.json'];
  const isAsset = req.url.includes('assets/') || nonBlockingExtensions.some(ext => req.url.endsWith(ext));

  if (isAsset) {
    return next(req);
  }

  loadingService.showLoader(req.url);

  return next(req).pipe(
    finalize(() => loadingService.hideLoader())
  );
};
