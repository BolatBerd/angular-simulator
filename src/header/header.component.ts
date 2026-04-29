import { Component, DestroyRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ThemeService } from '../classes/theme.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Preset } from '@primeuix/themes/types';

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

  private destroyRef: DestroyRef = inject(DestroyRef);
  themeService: ThemeService = inject(ThemeService);

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  html: HTMLElement = document.documentElement;
  companyName: string = 'румтибет';

  paymentOptions: any[] = [
    { name: 'Aura', value: 'aura' },
    { name: 'Lara', value: 'lara' },
    { name: 'Nora', value: 'nora' }
  ]

  themes: Record<'aura' | 'lara' | 'nora', Preset> = {
    aura: Aura,
    lara: Lara,
    nora: Nora
  };

  ngOnInit() {
    this.themeService.darkThemeChange$
      .pipe(
        tap((value: boolean) => this.html.classList.toggle('dark', value)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();

    this.themeService.dselectThemeChange$
    . pipe(
        tap((theme: string) => {
          if (theme in this.themes) {
            usePreset(this.themes[theme as keyof typeof this.themes]);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  changeTheme(value: boolean) {
    this.themeService.darkTheme(value);
  }

  changeSelectTheme(theme: string) {
    this.themeService.selectTheme(theme);
  }

  customStyle = {
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
