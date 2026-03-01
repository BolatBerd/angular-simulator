import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  router: Router = inject(Router);

  companyName: string = 'румтибет';

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];

  redirect(){
    this.router.navigate(['/user']);
  }

}
