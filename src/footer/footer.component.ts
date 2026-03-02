import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  companyIP: string = 'ИП Константинопольский К.К., 2023';

  messengers: string[] = [
    'telegram',
    'vk',
    'pinterest',
    'skype'
  ];

  routes: string[] = [
    "Прогулки в горы летом",
    "Зимние походы в горы",
    "Посещение храмов в горах",
    "Экстремальные виды туризма",
    "Походы в джунглях Амазонии",
    "Поездка в Африку"
  ];

  travelEssentials: string[] = [
    "Как собрать в долгий поход?",
    "Жизненно важные предметы для похода",
    "Медицинская страховка, гарантии безопасности",
    "Если вы врач - загляните сюда"
  ];

}
