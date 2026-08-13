import { LocalStorageService } from './local-storage.service';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage } from '../enums/Language';
import { PrimeNG } from 'primeng/config';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly translate: TranslateService = inject(TranslateService);
  private readonly primeNG: PrimeNG = inject(PrimeNG);
  private destroyRef: DestroyRef = inject(DestroyRef);

  private readonly languageSubject: BehaviorSubject<AppLanguage> = new BehaviorSubject<AppLanguage>(AppLanguage.RU);
  readonly language$: Observable<AppLanguage> = this.languageSubject.asObservable();

  private readonly LANGUAGE_KEY: string = 'language';

  DEFAULT_LANGUAGE: AppLanguage = AppLanguage.RU;
  SUPPORTED_LANGUAGES: AppLanguage[] = Object.values(AppLanguage);

  initLanguage(): void {
    this.translate.addLangs(this.SUPPORTED_LANGUAGES);
    this.translate.setFallbackLang(this.DEFAULT_LANGUAGE);

    const savedLanguage: AppLanguage | null = this.localStorageService.getItem(this.LANGUAGE_KEY,) as AppLanguage | null;

    if (savedLanguage && this.SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      this.setLanguage(savedLanguage);
      return;
    }

    const browserLeng: string = navigator.language.split('-')[0];

    if (this.SUPPORTED_LANGUAGES.includes(browserLeng as AppLanguage)) {
      this.setLanguage(browserLeng as AppLanguage)
      return;
    }

    this.setLanguage(this.DEFAULT_LANGUAGE);

    this.translate.onLangChange.pipe(
      tap(() => {
        this.updatePrimeNgTranslation();
      })
    ).subscribe();
  }

  getCurrentLanguage(): AppLanguage {
    return (this.translate.getCurrentLang() as AppLanguage) || this.DEFAULT_LANGUAGE;
  }

  setLanguage(language: AppLanguage): void {
    if (!this.SUPPORTED_LANGUAGES.includes(language)) {
      return;
    }

    this.localStorageService.setItem(this.LANGUAGE_KEY, language);
    this.translate.use(language);
    this.updatePrimeNgTranslation();
    this.languageSubject.next(language);
  }

  private updatePrimeNgTranslation(): void {
    this.translate.get('PRIMENG').pipe(
      tap((translation: Record<string, any>) => {
        this.primeNG.setTranslation(translation);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
