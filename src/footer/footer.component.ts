import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVk, faTelegram, faSkype,faPinterest, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  companyIP: string = 'ИП Константинопольский К.К., 2023';

  messengers: string | any = [
    { name: 'telegram', icon: faTelegram },
    { name: 'vk', icon: faVk },
    { name: 'pinterest', icon: faPinterest },
    { name: 'skype', icon: faSkype }
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
