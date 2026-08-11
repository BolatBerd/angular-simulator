import { faVk, faTelegram, faSkype, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { APP_CONFIG } from '../config.token';
import { AppConfig } from '../interfaces/IAppConfig';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  APP_CONFIG: AppConfig = inject(APP_CONFIG);

  companyName: string = this.APP_CONFIG.companyName;
  companyIP: string = 'ИП Константинопольский К.К., 2023';
  faAngleRight: IconDefinition = faAngleRight;

  messengers: IconDefinition[] = [faTelegram, faVk, faPinterest, faSkype];

  routes: string[] = [
    'FOOTER.ROUTE_1',
    'FOOTER.ROUTE_2',
    'FOOTER.ROUTE_3',
    'FOOTER.ROUTE_4',
    'FOOTER.ROUTE_5',
    'FOOTER.ROUTE_6',
  ];

  travelEssentials: string[] = [
    'FOOTER.ESSENTIAL_1',
    'FOOTER.ESSENTIAL_2',
    'FOOTER.ESSENTIAL_3',
    'FOOTER.ESSENTIAL_4',
  ];
}
