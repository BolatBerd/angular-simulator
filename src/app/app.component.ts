import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Collection } from '../collection';
import { IService } from '../interfaces/IService';
import { IImages } from '../interfaces/Images';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  companyName: string = 'румтибет';
  history: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';
  historySecondBlock: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.';

  currentDateAndTime: string = new Date().toLocaleString();
  isDateView: boolean = true;
  isLoading: boolean = true;
  text: string = '';
  count: number = 0;

  form = {
    location: '',
    date: '',
    persons: ''
  };

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

  protected tourImages: IImages[] = [
    { id: 1, src: "/images/cup-coffee.png" },
    { id: 2, src: "/images/man-on-mountain.png" },
    { id: 3, src: "/images/man-on-snowmobile.png" },
    { id: 4, src: "/images/river.png" }
  ];

  protected services: IService[] = [
    {
      id: 1,
      icon: "/images/people.svg",
      title: "Опытный гид",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      icon: "/images/shield.svg",
      title: "Безопасный поход",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      icon: "/images/tag.svg",
      title: "Лояльные цены",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ];

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.prices.replace(2, 550);
    this.tours.remove(1);
    this.tours.clearCollection();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();
    }, 1000);
    this.insertCountFromStorage();
  }

  toggleBlock(): void {
    this.isDateView = !this.isDateView;
  }

  incrementCount(): void {
    this.count++;
    this.saveCount();
  }

  decrementCount(): void {
    this.count--;
    this.saveCount();
  }

  private saveCount(): void {
    localStorage.setItem('count', this.count.toString());
  }

  private insertCountFromStorage(): void {
    const storedCount = localStorage.getItem('count');
    this.count = storedCount ? Number(storedCount) : 0;
  }

  openDatePicker(input: HTMLInputElement) {
    input.showPicker();
  }

  get isFormValid(): boolean {
    return !!(this.form.location && this.form.date && this.form.persons);
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

  private saveLastVisitDate(): void {
    localStorage.setItem('last-visit', new Date().toISOString());
  }

  private saveVisitCount(): void {
    const current: number = Number(localStorage.getItem('visit-count') || 0);
    localStorage.setItem('visit-count', String(current + 1));
  }
}
