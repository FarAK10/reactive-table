import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DatePipe } from '@angular/common';
import {
  TranslocoModule,
  TRANSLOCO_TRANSPILER,
  DefaultTranspiler,
} from '@ngneat/transloco';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), DatePipe, provideAnimations()],
};
