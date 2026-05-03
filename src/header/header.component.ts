import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ThemeService } from '../classes/theme.service';
import { inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { SelectButtonModule } from 'primeng/selectbutton';
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
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  companyName: string = 'румтибет';

  changeTheme(value: boolean): void {
    this.themeService.setDarkMode(value);
  }

  changeSelectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

}
