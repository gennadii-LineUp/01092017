import { Pipe, PipeTransform } from '@angular/core';
import {CommonServices} from '../../services/common.service';

@Pipe({
  name: 'dateFromServerMoment'
})
export class FromServerDateMomentPipe implements PipeTransform {

  constructor(public commonServices: CommonServices) {}

  transform(value: any) {
    if (value) {
      return this.commonServices.fromServerDateMoment(value);
    }
    return value;
  }

}
