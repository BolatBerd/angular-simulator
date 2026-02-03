import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import './training';
import { IImeges } from '../interfaces/IImeges';
import { ILists } from '../interfaces/Lists';
import { FormsModule } from '@angular/forms';
import { HeroComponent }  from '../classes/HeroComponent';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public companyName: string = 'румтибет';
  public history: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';
  public historySecondBlock: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.';
  public selectImeges!: IImeges;
  public selectLists!: ILists;

  public currentDate: Date = new Date();
  private sub!: Subscription;

  public ngOnInit() {
    this.sub = interval(1000).subscribe(() => {
      this.currentDate = new Date();
    });
    this.onInit();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public showDate: boolean = false;

  public toggleView(): void {
    this.showDate = !this.showDate;

    if (this.showDate) {
      this.currentDate = new Date();
    }
  }

  public text: string = '';

  protected isLoading: boolean = true;

  private onInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  public count: number = 0;

  public increment(): void {
      this.count++;
  }

  public decrement(): void {

      this.count--;

  }

  private heroComponent: HeroComponent = new HeroComponent();

  public get isFormValid(): boolean {
    return this.heroComponent.isFormsValid;
  }
  public get form() {
    return this.heroComponent.form;
  }

  public openDatePicker(input: HTMLInputElement) {
  input.showPicker();
  }

  protected openList(select: HTMLSelectElement | null) {
    if (!select) return;
    select.focus();

    if ((select as any).showPicker) {
      (select as any).showPicker();
      return;
    }

    const evt = new MouseEvent('mousedown', { bubbles: true });
    select.dispatchEvent(evt);
    select.click();
  }

  public info(): void {
    console.log('Программа выбрана');
  }

  protected imeges: IImeges[] = [
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

  protected lists: ILists[] = [
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

  public getImageRadiusClass(id: number): string {
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

  protected tours: Collection<string> = new Collection<string>([
    'Поход в горы',
    'Прогулка по парку',
    'Поход к реке'
  ]);

  protected prices: Collection<number> = new Collection<number>([
    500,
    600,
    700
  ]);

  public constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.prices.replace(2, 550);
    this.tours.remove(1);
    this.tours.clearCollection();
  }

  private isColorPrimary(color: Color): boolean {
    const primaryColor: Color[] = [
      Color.BLUE,
      Color.GREEN,
      Color.RED
    ];
    return primaryColor.includes(color);
  }

  private saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('last-visit-date', currentDate);
  }

  private saveVisitCount(): void {
    const countString: string | null = localStorage.getItem('visit-count');
    let count: number = countString ? parseInt(countString, 10) : 0;

    count++;

    localStorage.setItem('visit-count', count.toString());
  }

}
