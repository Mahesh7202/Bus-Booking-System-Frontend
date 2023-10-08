import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driverNameFilter'
})
export class DriverNameFilterPipe implements PipeTransform {

  transform(items: any[], filterText: string): any[] {
    if (!items || !filterText) {
      return items; // Return the original array if no filter text is provided
    }

    return items.filter((item) => {
      const driverFullName = `${item.firstName} ${item.lastName}`;
      return driverFullName.toLowerCase().includes(filterText.toLowerCase());
    });
  }
}
