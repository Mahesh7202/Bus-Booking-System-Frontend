import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterText: string): any[] {
    if (!filterText) {
      return items;
    }

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(filterText.toLowerCase());
      });
    });
  }

}
