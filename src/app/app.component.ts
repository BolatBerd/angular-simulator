import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Collection } from '../collection';
import { IService } from '../interfaces/IService';
import { IPicture } from '../interfaces/IPicture';
import { IForm } from '../interfaces/IForm';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  companyName: string = 'румтибет';

  readonly cupCoffee: string = "/images/cup-coffee.png";
  readonly manOnMountain: string = "/images/man-on-mountain.png";
  readonly manOnSnowmobile: string = "/images/man-on-snowmobile.png";
  readonly river: string = "/images/river.png";

  readonly people:string = "/images/people.svg";
  readonly shield: string = "/images/shield.svg";
  readonly tag: string = "/images/tag.svg";

  currentDateAndTime: string = new Date().toLocaleString();
  isDateView: boolean = true;
  isLoading: boolean = true;
  inputLivetText: string = '';
  count: number = 0;

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

  tourImages: IPicture[] = [
    {
      id: 1,
      src: this.cupCoffee,
      alt: "Кружка с кофе"
    },
    {
      id: 2,
      src: this.manOnMountain,
      alt: "Человек на горе"
    },
    {
      id: 3,
      src: this.manOnSnowmobile,
      alt: "Человек на снегоходе"
    },
    {
      id: 4,
      src: this.river,
      alt: "Река"
    }
  ];

  services: IService[] = [
    {
      id: 1,
      icon: this.people,
      title: "Опытный гид",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      icon: this.shield,
      title: "Безопасный поход",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      icon: this.tag,
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

    this.form = {
      location: '',
      date: '',
      persons: ''
    };

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.currentDateAndTime = new Date().toLocaleString();
    }, 1000);
    this.initializeCountFromStorage();
  }

  form!: IForm;

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

  private initializeCountFromStorage(): void {
    const storedCount: string | null = localStorage.getItem('count');
    this.count = storedCount ? Number(storedCount) : 0;
  }

  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }

  isFormValid(): boolean {
    return !!(this.form.location && this.form.date && this.form.persons);
  }

  openSelect(select: HTMLSelectElement | null): void {
  if (!select) {
    return;
  }

  select.focus();

  const picker = select as HTMLSelectElement & {
    showPicker?: () => void;
  };

  if (typeof picker.showPicker === 'function') {
    picker.showPicker();
    return;
  }

  select.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true })
  );
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
