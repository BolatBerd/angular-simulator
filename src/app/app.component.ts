import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import './training';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  companyName: string = 'румтибет';

  tours: Collection<string> = new Collection<string>([
    'Поход в горы',
    'Прогулка по парку',
    'Поход к реке'
  ]);

  prices: Collection<number> = new Collection<number>([
    500,
    600,
    700
  ]);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.prices.replace(2, 550);
    this.tours.remove(1);
    this.tours.clearCollection();
  }

  isColorPrimary(color: Color): boolean {
    const primaryColor: Color[] = [
      Color.BLUE,
      Color.GREEN,
      Color.RED
    ];
    return primaryColor.includes(color);
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('last-visit-date', currentDate);
  }

  saveVisitCount(): void {
    const countString: string | null = localStorage.getItem('visit-count');
    let count: number = countString ? parseInt(countString, 10) : 0;

    count++;

    localStorage.setItem('visit-count', count.toString());
  }

}
