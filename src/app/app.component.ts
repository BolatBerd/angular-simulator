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
    this.saveLestVisitDate();
    this.countVisit();
  }

  testColorEnum(color: Color): boolean {
    if (color === Color.RED || color === Color.GREEN || color === Color.BLUE) {
      return true;
    } else {
      return false;
    }
  }

  saveLestVisitDate(): void {
    const correntDate: string = new Date().toISOString();
    localStorage.setItem('lestVisitDate', correntDate);
  }

  countVisit(): void {
    const countString: string | null = localStorage.getItem('visitCount');
    let count = countString ? parseInt(countString, 10) : 0;

    count++;

    localStorage.setItem('visitCount', count.toString());
  }

}

const tours = new Collection<String>();
const prices = new Collection<Number>();

tours.replace(0, 'Поход на реку');
prices.replace(0, 550);
