import { Pipe, PipeTransform } from '@angular/core';

/* pipe for transforming long text in short */

@Pipe({
  name: 'shortText',
})

export class ShortTextPipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    //return original text if it's shorter than limit
    if (value.length <= limit) {
      return value;
    }

    return value.slice(0, limit) + '...';
  }

}
