import { Pipe, PipeTransform } from '@angular/core';
import {CommonServices} from '../../services/common.service';

@Pipe({
  name: 'dateFromServerMoment'
})
export class DateFromServerMomentPipe implements PipeTransform {

  constructor(public commonServices: CommonServices) {}

  transform(value: any) {
    if (value) {
      return this.commonServices.fromServerMoment(value);
    }
    return value;
  }

}
