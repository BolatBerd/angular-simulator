import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  LocalStorageService: LocalStorageService = inject(LocalStorageService);

  savedTheme: boolean = this.LocalStorageService.getItem<boolean>('mode')?? false;
  private isDarkThemeChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.savedTheme);
  isDarkThemeChange$: Observable<boolean> = this.isDarkThemeChange.asObservable();

  savedSelectTheme: string = this.LocalStorageService.getItem<string>('theme') ?? 'aura';
  private selectThemeChange: BehaviorSubject<string> = new BehaviorSubject<string>(this.savedSelectTheme);
  dselectThemeChange$: Observable<string> = this.selectThemeChange.asObservable();

  darkTheme(value: boolean): void {
    this.isDarkThemeChange.next(value);
    this.LocalStorageService.setItem('mode', value);
  }

  getMode(): boolean {
    return this.isDarkThemeChange.getValue();
  }

  updateMode(): void {
    this.darkTheme(this.getMode());
  }

  selectTheme(theme: string): void {
    this.selectThemeChange.next(theme);
    this.LocalStorageService.setItem('theme', theme);
  }

  getSelectTheme(): string {
    return this.selectThemeChange.getValue();
  }

  updateSelectTheme(): void {
    this.selectTheme(this.getSelectTheme());
  }
}
