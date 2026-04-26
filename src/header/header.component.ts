import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ToggleSwitchModule,
    FormsModule,
    CommonModule
  ],

  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  isDarkTheme: boolean = false;
  theme: string = 'light';

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  ngOnInit() {
    const savedTheme: string | null = localStorage.getItem('isStatus');
    const html: HTMLElement = document.documentElement;
    if (savedTheme === 'true') {
      html.classList.add('dark');
      this.isDarkTheme = true;
    } else {
      html.classList.remove('dark');
      this.isDarkTheme = false;
    }
  }

  toggleTheme(){
    const html: HTMLElement = document.documentElement;
    const isDark: boolean = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('isStatus', isDark ? 'true' : 'false');
  }
}
