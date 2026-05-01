import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  savedMode: boolean = this.localStorageService.getItem<boolean>('mode')?? false;
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.savedMode);
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  savedTheme: string = this.localStorageService.getItem<string>('theme') ?? 'aura';
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.savedTheme);
  theme$: Observable<string> = this.themeSubject.asObservable();

  isDarkTheme(value: boolean): void {
    this.darkModeSubject.next(value);
    this.localStorageService.setItem('mode', value);
  }

  getMode(): boolean {
    return this.darkModeSubject.getValue();
  }

  updateMode(): void {
    this.isDarkTheme(this.getMode());
  }

  selectTheme(theme: string): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem('theme', theme);
  }

  getSelectTheme(): string {
    return this.themeSubject.getValue();
  }

  updateSelectTheme(): void {
    this.selectTheme(this.getSelectTheme());
  }
}
