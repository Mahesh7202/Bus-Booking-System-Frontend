import { Component } from '@angular/core';
import { Bus } from 'src/app/ZSample/modals/bus';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BusService } from 'src/app/ZSample/services/bus.service';
import { SchedulerService } from 'src/app/ZSample/services/scheduler.service';
import { Schedule } from 'src/app/ZSample/modals/schedule';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { BusAssignedDataDTO } from 'src/app/ZSample/modals/DTo/BusAssignedDataDTO';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent {

  buses: Bus[] = [];
  busAssignedData: BusAssignedDataDTO[] = []
  schedule: Schedule[] = [];

  busesAssign: any[] = [];
  scheduleAssign: any[] = [];

  showScheduleTable: boolean = false;

  columns: string[] = ['licensePlate', 'model','type', 'currentLocation','capacity', 'upperSeatsCount', 'lowerSeatsCount'];

  scheduleColumns: string[] = ["licensePlate", "pathName", "departureTime", "arrivalTime", "distance", "driverName", "contactNumber", "status"]


  dataLoaded: boolean = false;

  constructor(
    private busService: BusService,
    private scheduleService: SchedulerService,
    private http: HttpClient,
    private helperService: HelperService,
    private router: Router
    ) {}


  ngOnInit() {
    console.log("here on inir")
    this.fetchBusData();
  }


  editFunction(item: any){
    const busID = item.busID;
    const id = item.scheduleID;
    this.router.navigateByUrl(`/admin/bus-details/edit/${id}/${busID}`);
  }

  showTable(busId: any){
    console.log(this.showScheduleTable)

    this.scheduleService.refreshObservable$.subscribe(() => {
      this.showScheduleTable = !this.showScheduleTable; // Toggle the table to trigger a refresh
    });

    console.log(this.showScheduleTable)
    this.transformData(busId)
    // this.showScheduleTable = true;

  }

  schedulesFunction(item: any, items: any[]): any[] {

    this.scheduleService.refreshObservable$.subscribe(() => {
      // Refresh the second component's data or perform any action needed
      this.showScheduleTable = !this.showScheduleTable; // Toggle the table to trigger a refresh
    });

    console.log(this.showScheduleTable)
    // this.showScheduleTable = !this.showScheduleTable;

    console.log(this.showScheduleTable)
    return items;
  }

  deleteItemEventForSchedule(item: any, items: any[]): any[] {
    const scheduleID = item.scheduleID;
    console.log(item)
    this.scheduleService.deleteSchedule(scheduleID).subscribe(() => {
      console.log("schedule data deleted")
    })
    items = items.filter((i:any) => i.scheduleID !== scheduleID);

    return items;
  }


  deleteItemEvent(item: any, items: any[]): any[] {
    const pathID = item.pathID;
    console.log(item)
    this.busService.deleteBus(pathID).subscribe(() => {
      console.log("passenger data deleted")
    })
    items = items.filter((i:any) => i.pathID !== pathID);

    return items;
  }


  fetchBusData() {
    // Assuming you have a method in DriverService to fetch driver data
    this.busService.getAllBusAssignData().subscribe((data: BusAssignedDataDTO[]) => {
      this.busAssignedData = data;
      this.getAllBuses(data);
      console.log(data);
      this.dataLoaded = true

      // this.fetchScheduleData();
    });
  }

  getAllBuses(data: BusAssignedDataDTO[]){
    data.forEach((dataItem) => this.busesAssign.push(dataItem.bus))
  }

  // fetchScheduleData(){
  //   this.scheduleService.getSchedules().subscribe((data: Schedule[]) => {
  //     this.schedule = data;
  //     this.transformData();
  //   })
  // }

  transformData(busID: number){
    console.log(this.busAssignedData)
    this.scheduleAssign = this.helperService.transformData(this.busAssignedData, busID)
    console.log(this.scheduleAssign)
  }

}

