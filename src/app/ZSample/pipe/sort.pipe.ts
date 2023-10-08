import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: any[], column: string, direction: 'asc' | 'desc' | null): any[] {
    if (!column || !direction) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = String(a[column]).toLowerCase();
      const bValue = String(b[column]).toLowerCase();

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

}
