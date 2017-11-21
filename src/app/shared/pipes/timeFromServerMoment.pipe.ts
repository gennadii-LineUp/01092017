import { Pipe, PipeTransform } from '@angular/core';
import {CommonServices} from '../../services/common.service';

@Pipe({
  name: 'timeFromServerMoment'
})
export class FromServerTimeMomentPipe implements PipeTransform {

  constructor(public commonServices: CommonServices) {}

  transform(value: any) {
    if (value) {
      return this.commonServices.fromServerTimeMoment(value);
    }
    return value;
  }

}
