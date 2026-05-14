import { Pipe, PipeTransform } from '@angular/core';
import { PhoneModes } from '../enums/PhoneModes';

@Pipe({
  name: 'phoneNumbers',
  standalone: true,
  pure: true
})
export class PhoneNumbersPipe implements PipeTransform {

  transform(value: string, mode: PhoneModes): string {
    const clearedNumber = value.replace(/[-\)\(x\' '.]/g, '').trim()
    const countryCode = clearedNumber.slice(0, 2);
    const operator = clearedNumber.slice(2, 5);
    const griup1  = clearedNumber.slice(5, 8);
    const griup2  = clearedNumber.slice(8, 10);
    const griup12  = clearedNumber.slice(5, 8).replace(/\d/g, '*');
    const griup22  = clearedNumber.slice(8, 10).replace(/\d/g, '*');
    const griup3  = clearedNumber.slice(10, 12);

    switch (mode) {
      case PhoneModes.COMPACT:
        return `+${clearedNumber}`;
      break;
      case PhoneModes.INTERNATIONAL:
        return `+${countryCode} ${operator} ${griup1} ${griup2} ${griup3}`;
      break;

      case PhoneModes.NATIONAL:
        return `+${operator} ${griup1} ${griup2} ${griup3}`;
      break;

      case PhoneModes.MASKED:
        return `+${operator} ${griup12} ${griup22} ${griup3}`;
      break;
    }
  }

}
