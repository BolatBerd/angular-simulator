import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhoneModes } from '../enums/PhoneModes';
import { IPhoneMode } from '../interfaces/IPhoneMode';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PhoneModesService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private modePhonSubject: BehaviorSubject<PhoneModes> = new BehaviorSubject<PhoneModes>(PhoneModes.INTERNATIONAL);
  modePhon$: Observable<PhoneModes> = this.modePhonSubject.asObservable();

    options: IPhoneMode[] = [
      {
        name: 'COMPACT',
        value: PhoneModes.COMPACT,
      },
      {
        name: 'INTERNATIONAL',
        value: PhoneModes.INTERNATIONAL,
      },
      {
        name: 'NATIONAL',
        value: PhoneModes.NATIONAL,
      },
      {
        name: 'MASKED',
        value: PhoneModes.MASKED,
      }
    ]

    setModePhone(value: PhoneModes){
      this.modePhonSubject.next(value);
      this.localStorageService.setItem('modePhone', value);
    }

}
