import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavItem } from '../interfaces/INavItem';
import { Observable, of ,map, pipe, filter, interval, take } from 'rxjs';

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

  companyName: string = 'румтибет';

  navItems: INavItem[] = [
    { label: 'Главная', path: '' },
    { label: 'Пользователи', path: 'user' }
  ];
  constructor() {
    const observable = new Observable(observer => {
      observer.next('Hello');
      observer.next('RxJS');
      observer.complete();
    });

    observable.subscribe({
      next: value => console.log(value),
      error: () => console.log('Error'),
      complete: () => console.log('Completed')
    });

    of(1,2,3,4,5)
      .pipe(
        map(x => x * 10)
      )
      .subscribe(console.log);

    of(1,2,3,4,5,6,7,8)
      .pipe(
        filter(x => x % 2 ===0)
      )
      .subscribe(console.log);

    interval(1000)
      .pipe(
        take(5)
      )
      .subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed')
      })

    interval(1000)
      .pipe(
        take(2)
      )
      .subscribe({
        next: (value) => {
          if (value === 0) console.log('Hello');
          if (value === 1) console.log('RxJs');
        },
        complete: () => console.log('Completed')
      })

      of('Hello World','RxJs !')
        .subscribe(console.log);

      of('Hello World2','RxJs !2')
        .subscribe({
          next: value => console.log(value),
          complete: () => console.log('Completed2')
        });
  }
}
