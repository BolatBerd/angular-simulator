import { Component } from '@angular/core';
import { IMessenger } from '../interfaces/IMessenger';
import { IOurService } from '../interfaces/IOurService';
import { ITravelEssential} from '../interfaces/ITravelEssential';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  companyIP: string = 'ИП Константинопольский К.К., 2023';

  messengers: IMessenger[] = [
    { id: 1, title: 'telegram'},
    { id: 2, title: 'vk'},
    { id: 3, title: 'pinterest'},
    { id: 4, title: 'skype'},
  ];

  ourServices: IOurService[] = [
    { id: 1, title: "Прогулки в горы летом" },
    { id: 2, title: "Зимние походы в горы" },
    { id: 3, title: "Посещение храмов в горах" },
    { id: 4, title: "Экстремальные виды туризма" },
    { id: 5, title: "Походы в джунглях Амазонии" },
    { id: 6, title: "Поездка в Африку" }
  ];

  travelEssentials: ITravelEssential[] = [
    { title: "Как собрать в долгий поход?" },
    { title: "Жизненно важные предметы для похода" },
    { title: "Медицинская страховка, гарантии безопасности" },
    { title: "Если вы врач - загляните сюда" }
  ];

}
