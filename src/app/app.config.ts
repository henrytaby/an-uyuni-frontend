import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer, inject, ErrorHandler } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { ConfigService } from './core/config/config.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { GlobalErrorHandler } from './core/handlers/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    //provideAnimations(),
    providePrimeNG({
        ripple: true,
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark', // Sincroniza con el switch de TailAdmin
                cssLayer: {
                    name: 'primeng',
                    order: 'base, primeng, components, utilities'
                }
            }
        }
    }),
    provideAppInitializer(() => {
        const configService = inject(ConfigService);
        return configService.loadConfig();
    }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
