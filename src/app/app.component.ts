import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import './training';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  constructor() {
    this.saveLastVisitDate();
    this.countVisit();
  }

  testColorEnum(color: Color): boolean {
    return (color === Color.RED || color === Color.GREEN || color === Color.BLUE);
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  countVisit(): void {
    const countString: string | null = localStorage.getItem('visitCount');
    let count = countString ? parseInt(countString, 10) : 0;

    count++;

    localStorage.setItem('visitCount', count.toString());
  }

}

const tours = new Collection<string>([
  'Поход на реку',
  'Поход на озеро',
  'Поход в горы'
]);

const prices = new Collection<number>();

prices.replace(0, 550);

console.log(tours.getAll());
console.log(prices.getAll());
console.log(tours.getByNumber(1));
tours.remove(1);
console.log(tours.getAll());
tours.clearCollection();
console.log(tours.getAll());
