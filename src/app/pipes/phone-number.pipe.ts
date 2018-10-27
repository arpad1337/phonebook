import { Pipe, PipeTransform } from '@angular/core';
import { format, ParsedNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: ParsedNumber, args?: string): any {
    if (!value) {
      return value;
    }
    return format(value, 'International');
  }

}