import { Component } from '@angular/core';
import { BusPath } from 'src/app/ZSample/modals/buspath';
import { Schedule } from 'src/app/ZSample/modals/schedule';
import { BusService } from 'src/app/ZSample/services/bus.service';
import { BuspathService } from 'src/app/ZSample/services/buspath.service';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { SchedulerService } from 'src/app/ZSample/services/scheduler.service';

@Component({
  selector: 'app-seat-details',
  templateUrl: './seat-details.component.html',
  styleUrls: ['./seat-details.component.css'],
})
export class SeatDetailsComponent {
  selectedPathNameBasedID!: number;
  selectedBus!: number;
  fareAmount!: number;
  checkbox1: boolean = false;

  busPaths: BusPath[] = [];
  scheduleData: Schedule[] = [];
  busTimings: any[] = [];

  allBuses: any[] = [];
  uniqueBuses: any[] = [];


  selectedCheckboxes: number[] = [];

  scheduleIDs: any[] = [];

  activeTabIndex = 0;



  constructor(
    private busPathService: BuspathService,
    private busService: BusService,
    private busSeatService: BusseatService,
    private scheduleService: SchedulerService,
    public helperService: HelperService,
  ) {}

  ngOnInit(): void {
    this.busPathService.getBusPaths().subscribe((data) => {
      console.log(data);
      this.busPaths = data;
    });
  }

  onSubmit() {
    console.log('Selected Path Name:', this.selectedPathNameBasedID);
    console.log('Selected Bus:', this.selectedBus);
    console.log('Checkbox 1:', this.checkbox1);
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  onPathChange() {
    this.scheduleService
      .getSchedulesByBusPath(this.selectedPathNameBasedID)
      .subscribe((data) => {
        this.scheduleData = data;

        // List of all buses
        this.allBuses = data.map((item) => item.bus);

        // List of buses without duplicates based on busID
        this.uniqueBuses = Array.from(
          new Set(this.allBuses.map((bus) => bus.busID))
        ).map((busID) => this.allBuses.find((bus) => bus.busID === busID));

        console.log(this.uniqueBuses)

      });
  }

  onBusChange(){
    console.log(this.scheduleData)
    for (const item of this.scheduleData) {
      if (item.busID == this.selectedBus) {
        this.busTimings.push({
          scheduleID: item.scheduleID,
          departureTime: item.departureTime,
          arrivalTime: item.arrivalTime,
        });
      }
    }

    console.log(this.busTimings)
  }

  OnBusTimingsSelected(event: any) {
    // Check if the event ID exists in scheduleIDs
    const index = this.scheduleIDs.findIndex(item => item.id === event);

    if (index !== -1) {
      // If it exists, remove the item from scheduleIDs
      this.scheduleIDs.splice(index, 1);
    } else {
      // If it doesn't exist, add a new item to scheduleIDs
      this.scheduleIDs.push({
        id: event,
        busTitle: this.uniqueBuses.find(data => data.busID == this.selectedBus)?.licensePlate
      });
    }

    console.log(this.scheduleIDs)

    const data = this.busPaths.find((data) => data.pathID == this.selectedPathNameBasedID);

    if(data){
      this.fareAmount = data.distance * 3;
    }

  }

}
