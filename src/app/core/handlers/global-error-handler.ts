import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { NetworkErrorService } from '@core/services/network-error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private injector = inject(Injector);



  handleError(error: unknown): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    const dynamicImportMessage = /error loading dynamically imported module/;
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (chunkFailedMessage.test(errorMessage) || dynamicImportMessage.test(errorMessage)) {
      console.error('[GlobalErrorHandler] Network Chunk Error detected:', errorMessage);
      
      const networkService = this.injector.get(NetworkErrorService);
      networkService.triggerConnectionError();
    } else {
      console.error(error);
    }
  }
}
