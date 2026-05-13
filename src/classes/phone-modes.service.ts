import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhoneModes } from '../enums/PhoneModes';
import { IPhoneModes } from '../interfaces/IPhoneModes';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PhoneModesService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private modePhonSubject: BehaviorSubject<PhoneModes> = new BehaviorSubject<PhoneModes>(PhoneModes.INTERNATIONAL);
  modePhon$: Observable<PhoneModes> = this.modePhonSubject.asObservable();

    options: IPhoneModes[] = [
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
