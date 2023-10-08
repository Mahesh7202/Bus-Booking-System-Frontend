import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {
  transform(items: any[], filters: any): any[] {
    console.log("here");
    if (!items || !filters) {
      return items;
    }

    // Check if all filters are empty
    const isAllFiltersEmpty =
      filters.modals.length === 0 &&
      filters.driverNames.length === 0 &&
      filters.busTypes.length === 0 &&
      filters.departureTime.length === 0 &&
      filters.arrivalTime.length === 0;

    if (isAllFiltersEmpty) {
      return items; // Return the original array if all filters are empty
    }

    // Filter items based on modal
    const filteredByModal = this.filterByModal(items, filters.modals);

    // Filter items based on driver name
    const filteredByDriverName = this.filterByDriverName(filteredByModal, filters.driverNames);

    // Filter items based on bus type
    const filteredByBusType = this.filterByBusType(filteredByDriverName, filters.busTypes);

    // Filter items based on departure time categories
    const filteredByDepartureTime = this.filterByTimeCategory(
      filteredByBusType,
      filters.departureTime, 'departure'
    );

    // Filter items based on arrival time categories
    const filteredByArrivalTime = this.filterByTimeCategory(
      filteredByDepartureTime,
      filters.arrivalTime, 'arrival'
    );

    return filteredByArrivalTime;
  }

  private filterByModal(items: any[], modals: string[]): any[] {
    if (modals.length === 0) {
      return items;
    }

    return items.filter(item => modals.includes(item.bus.model));
  }

  private filterByDriverName(items: any[], driverNames: string[]): any[] {
    if (driverNames.length === 0) {
      return items;
    }

    return items.filter(item => {
      const fullName = `${item.driver.firstName} ${item.driver.lastName}`;
      return driverNames.some(driverName => fullName.includes(driverName));
    });
  }

  private filterByBusType(items: any[], busTypes: string[]): any[] {
    if (busTypes.length === 0) {
      return items;
    }

    return items.filter(item => busTypes.includes(item.bus.type));
  }

  private filterByTimeCategory(items: any[], timeCategories: string[], type: string): any[] {
    if (timeCategories.length === 0) {
      console.log("once")

      return items;
    }

    console.log(timeCategories)

    const res = items.filter(item => {
      let data;
      if(type == "departure"){
        data = this.getTimeCategory(item.departureTime);
      }else{
        data = this.getTimeCategory(item.arrivalTime);
      }
      return (
        timeCategories.includes(data)
      );
    });

    console.log(res)
    return res
  }

  private getTimeCategory(item: any): string {
    const date = new Date(item);
    const hour = date.getHours();
    console.log(hour)
    if (hour < 6) {
      return 'Before6am';
    } else if (hour < 12) {
      return '6amTo12pm';
    } else if (hour < 18) {
      return '12pmTo6pm';
    } else {
      return 'After6pm';
    }
  }



}
