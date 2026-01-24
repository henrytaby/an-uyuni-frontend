import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AppConfig } from './config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  private configSignal = signal<AppConfig | null>(null);
  
  readonly config = this.configSignal.asReadonly();

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
