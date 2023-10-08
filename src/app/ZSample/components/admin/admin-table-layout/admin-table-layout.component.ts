import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { BusService } from 'src/app/ZSample/services/bus.service';
import { BuspathService } from 'src/app/ZSample/services/buspath.service';
import { DriverService } from 'src/app/ZSample/services/driver.service';
import { PassengerService } from 'src/app/ZSample/services/passenger.service';
import { SchedulerService } from 'src/app/ZSample/services/scheduler.service';

@Component({
  selector: 'app-admin-table-layout',
  templateUrl: './admin-table-layout.component.html',
  styleUrls: ['./admin-table-layout.component.css'],
})
export class AdminTableLayoutComponent implements OnInit {
  @Input() title!: string;
  @Input() items!: any[];
  @Input() columns!: string[];

  @Input() sortable: boolean = false;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Input() extra!: string;
  @Input() editFunction!: (item: any) => void;
  @Input() deleteItemEvent!: (item: any, items: any[]) => any[];

  @Input() schedulesFunction!: (item: any, items: any[]) => any[];


  @Output() showTable = new EventEmitter<number>();


  show(item: any, extra: string) {
    if (this.extra == 'schedule') {
      console.log(this.extra)

      this.scheduleService.triggerRefresh();
      this.showTable.emit(item.busID);

      // Emit the event when the "Schedules" button is clicked
      // this.showTable.emit(item.busID);
    }
    if(this.extra == 'More Details'){
      console.log(this.extra)
      this.bookingService.triggerRefresh();
      // Emit the event when the "Schedules" button is clicked
      this.showTable.emit(item.bookingId);
    }
  }


  invokeDeleteItemFunction(item: any) {
    // Call the deleteItemFunction to get the number
    const result = this.deleteItemEvent(item, this.items);
    console.log(result)
    this.items = result;

    this.updateDisplayedItems(); // Update the displayed items  }
  }


  invokeSchedulesFunction(item: any) {
    if(this.extra){
      const result = this.schedulesFunction(item, this.items);
      console.log(result)
      this.items = result;
    }
    // Call the deleteItemFunction to get the number
    this.updateDisplayedItems(); // Update the displayed items  }
  }


  // @Output() deleteItemEvent = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private busService: BusService,
    private passengerService: PassengerService,
    private buspthService: BuspathService,
    private scheduleService: SchedulerService,
    private driverService: DriverService,
    private bookingService: BookingService
    ) {}

  ngOnInit() {
    console.log(this.items);
    console.log('here on child init');

    this.paginatedData = this.items;
    this.updateDisplayedItems();
  }

  // Pagination properties
  totalItems: number = this.items?.length;
  paginatedData: any[] = [];

  filterText = '';

  sortColumn!: string;
  sortDirection: 'asc' | 'desc' = 'asc';

  get pages(): number[] {
    const pageCount = Math.ceil(this.items.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.updateDisplayedItems();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  private sortData(data: any[]): any[] {
    if (this.sortColumn && this.sortDirection) {
      return data.sort((a, b) => {
        const columnA = a[this.sortColumn];
        const columnB = b[this.sortColumn];

        if (typeof columnA === 'number' && typeof columnB === 'number') {
          // Compare numeric values
          if (this.sortDirection === 'asc') {
            return columnA - columnB;
          } else {
            return columnB - columnA;
          }
        } else {
          // Compare string values (case-insensitive)
          const stringA = String(columnA).toLowerCase();
          const stringB = String(columnB).toLowerCase();

          if (this.sortDirection === 'asc') {
            if (stringA < stringB) return -1;
            if (stringA > stringB) return 1;
          } else {
            if (stringA > stringB) return -1;
            if (stringA < stringB) return 1;
          }
        }

        return 0; // If values are equal
      });
    }
    return data;
  }

  updateDisplayedItems() {
    if (this.items && this.items.length > 0) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const sortedData = this.sortData(this.items);
      this.paginatedData = sortedData.slice(startIndex, endIndex);
      this.totalItems = this.items.length; // Update totalItems
    } else {
      this.paginatedData = [];
      this.totalItems = 0;
    }
  }

  sort(column: string) {
    if (this.sortable) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      this.updateDisplayedItems();
    }
  }




  // deleteItem(item: any) {
  //   this.deleteItemEvent.emit(item).then(() =<{

  //   });

  // }


}



