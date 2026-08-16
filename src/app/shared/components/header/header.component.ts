import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../features/auth/services/auth.service';
import { DATE_FORMAT } from '../../../../date-format.token';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from '../../../../config.token';
import { Component, inject } from '@angular/core';
import { INavItem } from '../../../core/interfaces/INavItem';
import { DatePipe } from '@angular/common';
import { Theme } from '../../../core/enums/Theme';
import { AppConfig } from '../../../core/interfaces/IAppConfig';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService} from '../../../core/services/language.service';
import { AppLanguage } from '../../../core/enums/Language';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ToggleSwitchModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    SelectButtonModule,
    AsyncPipe,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  DATE_FORMAT: string = inject(DATE_FORMAT);
  APP_CONFIG: AppConfig = inject(APP_CONFIG);

  readonly languageService: LanguageService = inject(LanguageService);

  authDate$: Observable<Date | null> = this.authService.authDate$;

  navItems: INavItem[] = [
    { label: 'NAV.MAIN', path: '' },
    { label: 'NAV.USERS', path: 'user' },
    { label: 'NAV.POSTS', path: 'posts' },
    { label: 'NAV.PARENT', path: 'parent' },
    { label: 'NAV.DEFAULT', path: 'change-detection-default' },
    { label: 'NAV.ON_PUSH', path: 'change-detection-on-push' },
  ];

  languageOptions: { code: AppLanguage; label: string }[] = [
    { code: AppLanguage.RU, label: 'RU' },
    { code: AppLanguage.EN, label: 'EN' },
    { code: AppLanguage.KZ, label: 'KZ' },
  ];

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  companyName: string = this.APP_CONFIG.companyName;

  currentDateAndTime: Date = new Date();

  setLanguage(language: AppLanguage): void {
    this.languageService.setLanguage(language);
  }

  changeTheme(value: boolean): void {
    this.themeService.setDarkMode(value);
  }

  changeSelectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  logout(): void {
    this.authService.logout();
  }

  redirectToLoginPage(): void {
    this.authService.redirectToLoginPage();
  }
}
