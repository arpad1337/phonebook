import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from '../models/profile';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(value: Profile, args?: string): any {
    if (!value) {
      return value;
    }
    return value.firstName.charAt(0).toUpperCase() + value.lastName.charAt(0).toUpperCase();
  }

}