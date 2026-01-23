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

  companyName: string = 'РУМТИБЕТ';

  tours = new Collection<string>([
    'Поход в горы',
    'Прогулка по парку',
    'Поход к реке'
  ]);

  prices = new Collection<number>([
    500,
    600,
    700
  ]);

  constructor() {
    this.saveLastVisitDate();
    this.countVisit();
    this.prices.replace(2, 550);
    this.tours.remove(1);
    this.tours.clearCollection();
  }

  isColorEnum(color: Color): boolean {
    const primaryColor: Color[] = [
      Color.BLUE,
      Color.GREEN,
      Color.RED
    ];
    return primaryColor.includes(color);
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  countVisit(): void {
    const countString: string | null = localStorage.getItem('visitCount');
    let count: number = countString ? parseInt(countString, 10) : 0;

    count++;

    localStorage.setItem('visitCount', count.toString());
  }

}
