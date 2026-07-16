import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../classes/theme.service';
import { AuthService } from '../features/auth/auth.service';
import { DATE_FORMAT } from '../date-format.token';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { INavItem } from '../interfaces/INavItem';
import { DatePipe } from '@angular/common';
import { inject } from '@angular/core';
import { Theme } from '../enums/Theme';

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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  DATE_FORMAT = inject(DATE_FORMAT);

  authDate$ = this.authService.authDate$;

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' },
    { label: 'Посты', path: 'posts' },
  ];

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  companyName = 'румтибет';

  currentDateAndTime: Date = new Date();

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
