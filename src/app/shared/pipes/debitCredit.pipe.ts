import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'debitCreditSign'
})
export class DebitCreditPipe implements PipeTransform {

  transform(value: any) {
    if (value === 'CREDIT') {
      return '+';
    }
    return '-';
  }


}
