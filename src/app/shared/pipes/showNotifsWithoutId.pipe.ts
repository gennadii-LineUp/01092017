import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showNotifsWithoutId'
})
export class ShowNotifsWithoutIdPipe implements PipeTransform {

  transform(value: string) {
    return (value.split('Id'))['0'];
  }


}
