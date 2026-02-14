import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Collection } from '../collection';
import { IService } from '../interfaces/IService';
import { ITourForm } from '../interfaces/ITourForm';
import { IPopularDestination } from '../interfaces/IPopularDestination';
import { ITravelBlog } from '../interfaces/ITravelBlog';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  companyName: string = 'румтибет';
  currentDateAndTime: string = new Date().toLocaleString();
  isDateView: boolean = true;
  isLoading: boolean = true;
  liveInputValue: string = '';
  count: number = 0;
  form: ITourForm = {};

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

  services: IService[] = [
    {
      id: 1,
      icon: "people-icon",
      title: "Опытный гид",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      icon: "shield-icon",
      title: "Безопасный поход",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      icon: "tag-icon",
      title: "Лояльные цены",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ];

  popularDestination: IPopularDestination[] = [
    {
      id: 1,
      image: "boat-on-lake",
      nameTour: "Озеро возле гор",
      tourDescription: "романтическое приключение",
      tourPrice: "480",
      tourEvaluation: 4.9,
    },
    {
      id: 2,
      image: "night-in-mountains",
      nameTour: "Ночь в горах",
      tourDescription: "в компании друзей",
      tourPrice: "500",
      tourEvaluation: 4.5,
    },
    {
      id: 3,
      image: "yoga-in-mountains",
      nameTour: "Йога в горах",
      tourDescription: "для тех, кто забоится о себе",
      tourPrice: "230",
      tourEvaluation: 5.0,
    },
  ]

  travelBlog: ITravelBlog[] = [
    {
      id: 1,
      title: "Красивая Италия, какая она в реальности?",
      content: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.",
      imege: "italy",
    },
    {
      id: 2,
      title: "Долой сомнения! Весь мир открыт для вас!",
      content: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих",
      imege: "pallet",
    },
    {
      id: 3,
      title: "Как подготовиться к путешествию в одиночку? ",
      content: "Для современного мира базовый вектор развития предполагает.",
      imege: "traveling-alone",
    },
    {
      id: 4,
      title: "Индия ... летим?",
      content: "Для современного мира базовый.",
      imege: "india",
    },
  ]

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

    this.initializeCountFromStorage();
  }

  private saveCount(): void {
    localStorage.setItem('count', this.count.toString());
  }

  private initializeCountFromStorage(): void {
    const storedCount: string | null = localStorage.getItem('count');
    this.count = storedCount ? Number(storedCount) : 0;
  }

  private saveLastVisitDate(): void {
    localStorage.setItem('last-visit', new Date().toISOString());
  };

  private saveVisitCount(): void {
    const current: number = Number(localStorage.getItem('visit-count') || 0);
    localStorage.setItem('visit-count', String(current + 1));
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

  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }

  isFormValid(): boolean {
    return !!(this.form.location && this.form.date && this.form.persons);
  }

  openSelect(select: HTMLSelectElement | null): void {
    select?.click();
  }

}
