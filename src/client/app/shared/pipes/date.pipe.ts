import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;

@Pipe({ name: 'sdDateTime' })
export class DateTimePipe implements PipeTransform {
    transform(value: any, args?: string[]): any {
        if (!value)
            return '';
        try {
            var date = new moment(value);
            return date.format('DD/MM/YYYY');
        } catch (e) {
            return '';
        }
    }
}