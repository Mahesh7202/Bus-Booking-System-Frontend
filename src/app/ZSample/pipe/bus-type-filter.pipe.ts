import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busTypeFilter'
})
export class BusTypeFilterPipe implements PipeTransform {

  transform(data: any[], filterTerm: string): any[] {
    if (!data || !filterTerm) {
      return data;
    }

    return data.filter(item => item.bus && item.bus.type.toLowerCase().includes(filterTerm.toLowerCase()));
  }

}
