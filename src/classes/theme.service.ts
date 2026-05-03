import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable} from 'rxjs';
import { Theme } from '../enums/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { IThemeOptions } from '../interfaces/IThemeOptions';
import { usePreset } from '@primeuix/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly MODE_KEY = 'mode';
  private readonly THEME_KEY = 'theme';
  html: HTMLElement = document.documentElement;

   themeOption: IThemeOptions[] = [
    {
      name: 'Aura',
      value: Theme.AURA,
      preset: Aura
    },
    {
      name: 'Lara',
      value: Theme.LARA,
      preset: Lara
    },
    {
      name: 'Nora',
      value: Theme.NORA,
      preset: Nora
    }
  ]

  savedMode: boolean = this.localStorageService.getItem<boolean>(this.MODE_KEY) ?? false;
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.savedMode);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  savedTheme: Theme = this.localStorageService.getItem<Theme>(this.THEME_KEY) ?? Theme.AURA;
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.savedTheme);
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.html.classList.toggle('dark', this.savedMode);
  }

  setDarkMode(value: boolean): void {
    this.darkModeSubject.next(value);
    this.localStorageService.setItem(this.MODE_KEY, value);
    this.html.classList.toggle('dark', value)
  }

  selectTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem(this.THEME_KEY, theme);

    const option: IThemeOptions | undefined = this.themeOption.find((option: IThemeOptions) => option.value === theme);

    if (option) {
      usePreset(option.preset);
    }
  }

  customStyle: Record<string, any> = {
    colorScheme: {
      light: {
        root: {
          background: '{lime.300}',
          checkedBackground: '{amber.500}'
        }
      },
      dark: {
        root: {
          background: '{blue.700}',
          checkedBackground: '{amber.400}'
        }
      }
    }
  };
}
