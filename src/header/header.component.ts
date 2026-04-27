import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../classes/theme.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

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
    FontAwesomeModule
  ],

  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  faSun: IconDefinition = faSun;
  faMoon:IconDefinition = faMoon;
  themeControl: FormControl = new FormControl<boolean>(false);
  private themeService: ThemeService = inject(ThemeService);
  companyName: string = 'румтибет';

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  ngOnInit() {
    this.themeControl.valueChanges
      .pipe
        (tap(value => {
        this.themeService.darkTheme(value);
        })
      ).subscribe();

    this.themeService.darkThemeChange$
      .pipe(
        tap(value => {
          this.themeControl.setValue(value, { emitEvent: false });
        })
      ).subscribe();
  }

}
