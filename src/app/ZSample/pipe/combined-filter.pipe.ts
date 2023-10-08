// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'combinedFilter'
// })
// export class CombinedFilterPipe implements PipeTransform {
//   transform(
//     items: any[],
//     filterCriteria: {
//       busTypes: string[];
//       driverNames: string[];
//       busModels: string[];
//     }
//   ): any[] {
//     if (!items || !filterCriteria) {
//       console.log("hereagain")

//       return items;
//     }
//     console.log("here")

//    const data =  items.filter((item) => {
//       const busTypeMatch =
//         filterCriteria.busTypes.length === 0 ||
//         filterCriteria.busTypes.includes(item.bus?.type);

//       const driverNameMatch =
//         filterCriteria.driverNames.length === 0 ||
//         filterCriteria.driverNames.some((name) =>
//           (item.driver.firstName + ' ' + item.driver.lastName)
//             .toLowerCase()
//             .includes(name.toLowerCase())
//         );

//       const busModelMatch =
//         filterCriteria.busModels.length === 0 ||
//         filterCriteria.busModels.includes(item.bus.model);

//       return busTypeMatch && driverNameMatch && busModelMatch;
//     });

//     console.log(data)


//     return data;
//   }
// }




import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'combinedFilter',
  pure: true, // Add this

})
export class CombinedFilterPipe implements PipeTransform {
  transform(items: any[], filters: any): any[] {
    if (!items || !filters) {
      return items;
    }
    console.log("heree")

    return items.filter((item) => {
      // Implement your filtering logic here based on the 'filters' object
      // For example, you can check if the item matches each filter condition
      // and return true only if all conditions are met
      if (
        this.filterByModal(item, filters.busModels) &&
        this.filterByBusType(item, filters.busTypes) &&
        this.filterByDriverName(item, filters.driverNames)
        // this.filterByDepartureTime(item, filters.departureTimes) &&
        // this.filterByArrivalTime(item, filters.arrivalTimes)
      ) {
        return true;
      }

      return false;
    });
  }

  // Implement individual filter methods based on your criteria
  private filterByModal(item: any, filterValues: string[]): boolean {
    // Implement your filter logic for the 'busModels' criteria here
    return filterValues.length === 0 || filterValues.includes(item.bus.model);
  }

  private filterByBusType(item: any, filterValues: string[]): boolean {
    // Implement your filter logic for the 'busTypes' criteria here
    return filterValues.length === 0 || filterValues.includes(item.bus.type);
  }

  private filterByDriverName(item: any, filterValues: string[]): boolean {
    // Implement your filter logic for the 'driverNames' criteria here
    const driverFullName = `${item.driver.firstName} ${item.driver.lastName}`;
    return filterValues.length === 0 || filterValues.includes(driverFullName);
  }

  // private filterByDepartureTime(item: any, filterValues: string[]): boolean {
  //   // Implement your filter logic for the 'departureTimes' criteria here
  //   // Example: Check if item.departureTime falls within selected time ranges
  //   return filterValues.length === 0 || filterValues.includes('Your Filter Logic Here');
  // }

  // private filterByArrivalTime(item: any, filterValues: string[]): boolean {
  //   // Implement your filter logic for the 'arrivalTimes' criteria here
  //   // Example: Check if item.arrivalTime falls within selected time ranges
  //   return filterValues.length === 0 || filterValues.includes('Your Filter Logic Here');
  // }
}
