import { Pipe, PipeTransform } from '@angular/core';
import { PhoneModes } from '../enums/PhoneModes';

@Pipe({
  name: 'phoneNumbers',
  standalone: true,
  pure: true
})
export class PhoneNumbersPipe implements PipeTransform {

    private phoneRegex: RegExp = /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/;

  transform(value: string, mode: PhoneModes): string {
    const clearedNumber: string = value.replace(/\D/g, '').trim();

    switch (mode) {
      case PhoneModes.COMPACT:
        return `+${clearedNumber}`;
      case PhoneModes.INTERNATIONAL:
        return clearedNumber.replace(this.phoneRegex,'+$1 $2 $3 $4 $5');

      case PhoneModes.NATIONAL:
        return clearedNumber.replace(this.phoneRegex, '$2 $3 $4 $5');

      case PhoneModes.MASKED:
        return clearedNumber.replace(this.phoneRegex, '+$1 $2 *** ** $5');
      default:
        return value;
    }
  }

}
