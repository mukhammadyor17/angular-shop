import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (value == null) return '';

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num) || !Number.isFinite(num)) {
      return '0';
    }

    const roundedNum = Number(num.toFixed(2));

    let formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(roundedNum);

    formatted = formatted.replace(/,/g, ' ');

    return `$${formatted}`;
  }
}
