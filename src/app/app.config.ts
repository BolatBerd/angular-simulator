import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';

const themeMap: Record<Theme, Preset> = {
  [Theme.AURA]: Aura,
  [Theme.LARA]: Lara,
  [Theme.NORA]: Nora
};

function getSavedTheme(): Theme {
  const value = localStorage.getItem('theme') as Theme | null;
  return value && value in themeMap ? value : Theme.AURA;
}

function getThemePreset(theme: Theme): Preset {
  return themeMap[theme];
}

const savedTheme = getSavedTheme();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideZoneChangeDetection(),

    providePrimeNG({
      theme: {
        preset: getThemePreset(savedTheme),
        options: {
          darkModeSelector: '.dark'
        }
      }
    })
  ]
};
