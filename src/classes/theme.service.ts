import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  LocalStorageService: LocalStorageService = inject(LocalStorageService);

  private darkThemeChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  darkThemeChange$: Observable<boolean> = this.darkThemeChange.asObservable();
  savedTheme: string | null = this.LocalStorageService.getItem<string>('isStatus');
  html: HTMLElement = document.documentElement;


  constructor() {
    this.darkThemeChange.pipe(
      tap((value: boolean) => {
        if (value) {
          this.html.classList.add('dark');
        } else {
          this.html.classList.remove('dark');
        }
        this.LocalStorageService.setItem('isStatus', value ? 'true' : 'false');
      }),
    ).subscribe();
    this.darkThemeChange.next(this.savedTheme === 'true');
  }

  darkTheme(value: boolean): void {
    this.darkThemeChange.next(value);
  }
}
