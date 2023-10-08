import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/ZSample/services/bus.service';
import { Location } from '@angular/common';
import { DriverService } from 'src/app/ZSample/services/driver.service';
import { Driver } from 'src/app/ZSample/modals/driver';
import { BusPath } from 'src/app/ZSample/modals/buspath';
import { BuspathService } from 'src/app/ZSample/services/buspath.service';
import { Bus } from 'src/app/ZSample/modals/bus';
import { Schedule } from 'src/app/ZSample/modals/schedule';
import { SchedulerService } from 'src/app/ZSample/services/scheduler.service';
import { searchData } from 'src/app/ZSample/modals/DTo/searchData';
import { busDetails } from 'src/app/ZSample/modals/DTo/busDetailsDTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.css'],
})
export class SearchLayoutComponent {

  departureTimeCategories = [
    { label: 'Before 6 am', value: 'Before6am' },
    { label: '6 am to 12 pm', value: '6amTo12pm' },
    { label: '12 pm to 6 pm', value: '12pmTo6pm' },
    { label: 'After 6 pm', value: 'After6pm' }
  ];

  arrivalTimeCategories = [
    { label: 'Before 6 am', value: 'Before6am' },
    { label: '6 am to 12 pm', value: '6amTo12pm' },
    { label: '12 pm to 6 pm', value: '12pmTo6pm' },
    { label: 'After 6 pm', value: 'After6pm' }
  ];





  isEditable: boolean = false;
  formSubscription!: Subscription;


  dataLoaded: boolean = false;
  busDataArray!: busDetails;

  busPaths!: BusPath;
  buses: Bus[] = [];
  driversData: Driver[] = [];

  filterText: string = '';
  filterModal: string = '';
  filterBusType: string = '';
  filterDriverName: string = '';

  filterModals: string[] = [];
  filterDriverNames: string[] = [];
  filterBusTypes: string[] = [];
  filterDerivedTime: string[] = [];
  filterArrivalTime: string[] = [];




  source: string = '';
  destination: string = '';
  onDate: string = '';

  searchBusesForm!: FormGroup;
  searchData!: searchData;

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private driverService: DriverService,
    private buspathService: BuspathService,
    private scheduleService: SchedulerService
  ) {}

  ngOnInit() {
    console.log("here againa")
    this.searchBusesForm = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      onDate: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.source = params['source']
      this.destination = params['destination']
      this.onDate = params['onDate']
      this.searchData = {
        source: this.source,
        destination: this.destination,
        onDate: this.onDate,
      };
      console.log(this.searchData);

      this.searchBusesForm.patchValue(this.searchData);
      console.log(this.searchBusesForm);

      this.getBusPathData();
    });



  }


  // Get distinct modal values
  get distinctModals() {
    return [...new Set(this.buses.map((bus) => bus.model))];
  }

  // Get distinct bus type values
  get distinctBusTypes() {
    return [...new Set(this.buses.map((bus) => bus.type))];
  }

  // Get distinct drivers based on your data
  get distinctDrivers() {
    return [...new Set(this.driversData.map((driver) => driver.firstName + '' + driver.lastName))];
  }



    // Define a computed property for filteredBuses based on filters
  get filteredBuses() {
      return this.buses.filter(
        (bus) =>
          bus.model.toLowerCase().includes(this.filterModal.toLowerCase()) &&
          bus.type.toLowerCase().includes(this.filterBusType.toLowerCase())
      );
    }

        // Define a computed property for filteredBuses based on filters
  // get filterDriverName() {
  //   return this.buses.filter(
  //     (bus) =>
  //       bus.model.toLowerCase().includes(this.filterModal.toLowerCase()) &&
  //       bus.type.toLowerCase().includes(this.filterBusType.toLowerCase())
  //   );
  // }





  updateFilterDriver(selectedDriver: any) {
    if (this.filterDriverNames.includes(selectedDriver)) {
      this.filterDriverNames = this.filterDriverNames.filter(item => item !== selectedDriver);
    } else {
      this.filterDriverNames = [...this.filterDriverNames, selectedDriver];
    }


    console.log(this.filterDriverNames);
  }

  // Filter buses by modal
  updateFilterModal(modal: string) {
    if (this.filterModals.includes(modal)) {
      this.filterModals = this.filterModals.filter(item => item !== modal);
    } else {
      this.filterModals = [...this.filterModals, modal];
    }

    console.log(this.filterModals);
  }


  // Filter buses by bus type
  updateFilterBusType(busType: string) {
    if (this.filterBusTypes.includes(busType)) {
      this.filterBusTypes = this.filterBusTypes.filter(item => item !== busType);
    } else {
      this.filterBusTypes = [...this.filterBusTypes, busType];
    }

    console.log(this.filterBusTypes);
  }


  updateFilterDepartureTime(derivedTime: any){
    if (this.filterDerivedTime.includes(derivedTime)) {
      this.filterDerivedTime = this.filterDerivedTime.filter(item => item !== derivedTime);
    } else {
      this.filterDerivedTime = [...this.filterDerivedTime, derivedTime];
    }

    console.log(this.filterDerivedTime);
  }

  updateFilterArrivalTime(arrivalTime: any){
    if (this.filterArrivalTime.includes(arrivalTime)) {
      this.filterArrivalTime = this.filterArrivalTime.filter(item => item !== arrivalTime);
    } else {
      this.filterArrivalTime = [...this.filterArrivalTime, arrivalTime];
    }

    console.log(this.filterArrivalTime);
  }





  getBusPathData(){
    console.log("hello");

    this.buspathService
      .getBusPathByPoints(this.source, this.destination)
      .subscribe((data) => {
        this.busPaths = data;

        this.scheduleService.getSchedulesByBusPathAndArrivalDate(this.busPaths, this.onDate).subscribe((data: Schedule[]) =>{
          console.log(data)
          const busDetail = {
            schedule: data,
            busPaths: this.busPaths
          }
          this.getBusesData(data);
          this.busDataArray = busDetail;
          console.log(this.busPaths)
          this.dataLoaded = true


        })
      });
  }

  onSubmit() {
    if(!this.isEditable){
      this.isEditable = true;
    }else{
      if (this.searchBusesForm.valid) {
        this.isEditable = false;
        const source = this.searchBusesForm.get('source')?.value;
        const destination = this.searchBusesForm.get('destination')?.value;
        const onDate = this.searchBusesForm.get('onDate')?.value;

        this.router.navigateByUrl(`/bus-ticket/${source}/${destination}/${onDate}`);
      }
    }
  }

  getBusesData(data: Schedule[]){
    data.forEach(element => {
      if (element.bus) {
        this.buses.push(element.bus);
      }
      if (element.driver) {
        this.driversData.push(element.driver);
      }
    });


  }




  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
