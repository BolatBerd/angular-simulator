import { LocalStorageService } from './local-storage.service';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage } from '../enums/Language';
import { PrimeNG } from 'primeng/config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly localStorage: LocalStorageService = inject(LocalStorageService);
  private readonly translate: TranslateService = inject(TranslateService);
  private readonly primeNG: PrimeNG = inject(PrimeNG);

  private readonly LANGUAGE_KEY: string = 'language';

  DEFAULT_LANGUAGE: AppLanguage = AppLanguage.RU;
  SUPPORTED_LANGUAGES: AppLanguage[] = [AppLanguage.RU,  AppLanguage.EN,  AppLanguage.KZ];

  initLanguage(): void {
    this.translate.addLangs(this.SUPPORTED_LANGUAGES);
    this.translate.setFallbackLang(this.DEFAULT_LANGUAGE);

    const savedLanguage: AppLanguage | null = this.localStorage.getItem(
      this.LANGUAGE_KEY,
    ) as AppLanguage | null;

    const language: AppLanguage =
      savedLanguage && this.SUPPORTED_LANGUAGES.includes(savedLanguage)
        ? savedLanguage
        : this.DEFAULT_LANGUAGE;

    this.setLanguage(language);

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

    this.localStorage.setItem(this.LANGUAGE_KEY, language);
    this.translate.use(language).pipe(
      tap(() => {
        this.updatePrimeNgTranslation();
      })
    ).subscribe();
  }

  private updatePrimeNgTranslation(): void {
    this.translate.get('PRIMENG').pipe(
      tap((translation) => {
        this.primeNG.setTranslation(translation);
      })
    ).subscribe();
  }

}
