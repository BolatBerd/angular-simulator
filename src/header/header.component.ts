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
  html: HTMLElement = document.documentElement;
  theme: string = 'light';

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  ngOnInit() {
    const savedTheme: string | null = localStorage.getItem('isStatus');
    if (savedTheme === 'true') {
      this.html.classList.add('dark');
      this.isDarkTheme = true;
    } else {
      this.html.classList.remove('dark');
      this.isDarkTheme = false;
    }
  }

  toggleTheme(){
    this.isDarkTheme = this.html.classList.toggle('dark');
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('isStatus', this.isDarkTheme ? 'true' : 'false');
  }
}
