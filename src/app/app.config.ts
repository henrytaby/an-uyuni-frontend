import { ApplicationConfig, provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { ConfigService } from './core/config/config.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    providePrimeNG({
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
    })
  ]
};
