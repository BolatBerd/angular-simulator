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

function getThemePresetFromStorage(): Preset {
  const themeMap: Record<Theme, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora
  };

  const saved: Theme = localStorage.getItem('theme') as Theme;

  const theme: Theme = saved && saved in themeMap ? saved : Theme.AURA;

  return themeMap[theme];
}

function initDarkMode(): void {
  const saved: string | null = localStorage.getItem('mode');

  const isDark: boolean = saved === 'true';

  document.documentElement.classList.toggle('dark', isDark);
}

initDarkMode();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getThemePresetFromStorage(),
        options: {
          darkModeSelector: '.dark',
        }
      }
    })
  ]
};
