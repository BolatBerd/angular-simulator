import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import './training';
import { IImeges } from '../interfaces/IImeges';
import { ILists } from '../interfaces/Lists';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  companyName: string = 'румтибет';
  history: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';
  historySecondBlock: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.';
  selectImeges!: IImeges;
  selectLists!: ILists;

  imeges: IImeges[] = [
    {
      id: 1,
      src: "/images/cup-coffee.png"
    },
    {
      id: 2,
      src: "/images/man-on-mountain.png"
    },
    {
      id: 3,
      src: "/images/man-on-snowmobile.png"
    },
    {
      id: 4,
      src: "/images/river.png"
    }
  ]

  lists: ILists[] = [
    {
      id: 1,
      src: "/images/people.png",
      h3: "Опытный гид",
      p: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      src: "/images/shield.png",
      h3: "Безопасный поход",
      p: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      src: "/images/tag.png",
      h3: "Лояльные цены",
      p: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ]

  getImageRadiusClass(id: number): string {
  switch (id) {
    case 1:
      return 'radius-top-left';
    case 2:
      return 'radius-top-right';
    case 3:
      return 'radius-bottom-left';
    case 4:
      return 'radius-bottom-right';
    default:
      return '';
  }
}

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
