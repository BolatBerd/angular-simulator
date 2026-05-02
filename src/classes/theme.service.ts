import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable} from 'rxjs';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private readonly MODE_KEY = 'mode';
  private readonly THEME_KEY = 'theme';

  savedMode: boolean = this.localStorageService.getItem<boolean>(this.MODE_KEY) ?? false;
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.savedMode);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  savedTheme: Theme = this.localStorageService.getItem<Theme>(this.THEME_KEY) ?? Theme.AURA;
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.savedTheme);
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  setDarkMode(value: boolean): void {
    this.darkModeSubject.next(value);
    this.localStorageService.setItem(this.MODE_KEY, value);
  }

  getMode(): boolean {
    return this.darkModeSubject.getValue();
  }

  selectTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem(this.THEME_KEY, theme);
  }

  getSelectTheme(): Theme {
    return this.themeSubject.getValue();
  }

}
