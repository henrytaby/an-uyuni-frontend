import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AppConfig } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSignal = signal<AppConfig | null>(null);
  
  readonly config = this.configSignal.asReadonly();

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return lastValueFrom(this.http.get<AppConfig>('assets/config/config.json'))
      .then(config => {
        this.configSignal.set(config);
        console.log('Configuration loaded:', config);
      })
      .catch(error => {
        console.error('Could not load configuration:', error);
      });
  }

  get apiUrl(): string {
    return this.configSignal()?.apiUrl || '';
  }

  get authConfig() {
    return this.configSignal()?.authConfig;
  }
}
