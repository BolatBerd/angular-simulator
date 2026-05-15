import { Pipe, PipeTransform } from '@angular/core';
import { PhoneModes } from '../enums/PhoneModes';

@Pipe({
  name: 'phoneNumbers',
  standalone: true,
  pure: true
})
export class PhoneNumbersPipe implements PipeTransform {

  private readonly phoneRegex12: RegExp = /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/;
  private readonly phoneRegex11: RegExp = /(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/;
  private readonly phoneRegex10: RegExp = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;

  transform(value: string, mode: PhoneModes): string {
    if (!value) return '';

    const normalizedValue: string = value.split(/ext|x/i)[0];
    const clearedNumber: string = normalizedValue.replace(/\D/g, '');

    if (clearedNumber.length === 12) {
      return this.format12(clearedNumber, mode);
    }

    if (clearedNumber.length === 11) {
      return this.format11(clearedNumber, mode);
    }

    if (clearedNumber.length === 10) {
      return this.format10(clearedNumber, mode);
    }

    return value;
  }

  private format12(value: string, mode: PhoneModes): string {
    switch (mode) {
      case PhoneModes.INTERNATIONAL:
        return value.replace(this.phoneRegex12, '+$1 $2 $3 $4 $5');

      case PhoneModes.NATIONAL:
        return value.replace(this.phoneRegex12, '$2 $3 $4 $5');

      case PhoneModes.MASKED:
        return value.replace(this.phoneRegex12, '+$1 $2 *** ** $5');

      default:
        return `+${value}`;
    }
  }
  private format11(value: string, mode: PhoneModes): string {
    switch (mode) {
      case PhoneModes.INTERNATIONAL:
        return value.replace(this.phoneRegex11, '+$1 $2 $3 $4 $5');

      case PhoneModes.NATIONAL:
        return value.replace(this.phoneRegex11, '$2 $3 $4 $5');

      case PhoneModes.MASKED:
        return value.replace(this.phoneRegex11, '+$1 $2 ** ** $5');

      default:
        return `+${value}`;
    }
  }
  private format10(value: string, mode: PhoneModes): string {
    switch (mode) {
      case PhoneModes.INTERNATIONAL:
        return value.replace(this.phoneRegex10, '+$1 $2 $3 $4 $5');

      case PhoneModes.NATIONAL:
        return value.replace(this.phoneRegex10, '$2 $3 $4 $5');

      case PhoneModes.MASKED:
        return value.replace(this.phoneRegex10, '+$1 $2 ** ** $5');

      default:
        return `+${value}`;
    }
  }

}
