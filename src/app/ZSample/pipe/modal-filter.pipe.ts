import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalFilter'
})
export class ModalFilterPipe implements PipeTransform {

  transform(data: any[], filterTerm: string): any[] {
    if (!data || !filterTerm) {
      return data;
    }

    return data.filter(item => item.bus && item.bus.model.toLowerCase().includes(filterTerm.toLowerCase()));
  }
  
}
