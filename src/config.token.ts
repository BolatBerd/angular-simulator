import { InjectionToken } from '@angular/core';
import { AppConfig } from './app/shared/interfaces/IAppConfig';

export const APP_CONFIG: InjectionToken<AppConfig> = new InjectionToken<AppConfig>('APP_CONFIG');
