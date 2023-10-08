import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { BusSeat } from 'src/app/ZSample/modals/busSeat';
import {
  BusSeatAddRequestDTO,
  SeatTypeRequest,
} from 'src/app/ZSample/modals/DTo/BusSeatAddRequestDTO';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.css'],
})
export class BusFormComponent {
  locations: string[] = [
    'Mumbai, Maharashtra',
    'Delhi, National Capital Territory of Delhi',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Pune, Maharashtra',
    // Add more locations as needed
  ];

  busSeatType: string[] = ['Sleeper', 'Semi-Sleeper', 'Seater'];

  busTypes: string[] = [
    'Non-AC',
    'AC',
    'Seater',
    'Sleeper',
    'Semi-Sleeper',
    'Volvo',
    'Mini Bus',
    'Luxury',
    'Double Decker',
    'Intercity',
    'School Bus',
    'Executive',
  ];

  busForm!: FormGroup;
  scheduleForms: FormGroup[] = [];
  scheduleForm!: FormGroup;
  busSeatForm!: FormGroup;
  combinedFormGroup!: FormGroup;

  driverID!: number;
  selectedpathID!: number;

  isEditMode = false;
  busID!: number;
  pathID!: number;
  scheduleID!: number;

  drivers: Driver[] = [];
  busPaths: BusPath[] = [];
  storedFormData: BusSeat[] = [];

  scheduleData: Schedule[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private busService: BusService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private helperService: HelperService,
    private driverService: DriverService,
    private buspathService: BuspathService,
    private scheduleService: SchedulerService,
    private busseatService: BusseatService
  ) {}

  ngOnInit() {
    this.getDriverData();
    this.getBusPathData();

    this.busForm = this.formBuilder.group({
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
      currentLocation: ['', Validators.required],
      upperSeatsCount: [
        0,
        [Validators.required, Validators.max(15), Validators.min(0)],
      ],
      lowerSeatsCount: [
        0,
        [Validators.required, Validators.max(40), Validators.min(0)],
      ],
      capacity: [0, Validators.required], // You can initialize it to 0 or your desired default value
    });

    this.initializeScheduleForm();

    this.busSeatForm = this.formBuilder.group({
      seatType: ['', Validators.required],
      totalSeats: ['', Validators.required],
    });

    // Combine both form groups into a single form group
    this.combinedFormGroup = this.formBuilder.group({
      busForm: this.busForm,
      scheduleForms: this.scheduleForms,
      busSeatForm: this.busSeatForm,
    });

    // Check if we are in edit mode (URL has 'edit/:id')
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        // Fetch the bus data by ID and set the form values for editing
        this.busID = params['busID'];
        this.scheduleID = params['id'];

        this.busService.getBusById(this.busID).subscribe((busData) => {
          this.busForm.patchValue(busData);
        });

        this.scheduleService
          .getSchedulesByBusID(this.busID)
          .subscribe((busData) => {
            this.scheduleData =
              this.helperService.transformScheduleDataForTable(busData);

            this.scheduleData.forEach((data) => {
              this.scheduleForm.patchValue(data);

              this.scheduleForms.push(this.scheduleForm);
            });

            console.log(this.scheduleData);
            console.log(this.scheduleForms);
          });
      }
    });

    // Listen for changes in lowerSeatsCount and upperSeatsCount
    this.busForm.get('lowerSeatsCount')?.valueChanges.subscribe(() => {
      this.calculateCapacity();
    });

    this.busForm.get('upperSeatsCount')?.valueChanges.subscribe(() => {
      this.calculateCapacity();
    });
  }

  initializeScheduleForm() {
    this.scheduleForm = this.formBuilder.group({
      driverID: ['', Validators.required],
      pathID: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', [Validators.required, this.validateArrivalTime]],
      status: ['Active', Validators.required], // Default to 'Active'
    },{
        validator: this.validateDepartureArrivalTimes
    });
  }

  removeScheduleForm(index: number) {
    if (index >= 0 && index < this.scheduleForms.length) {
      this.scheduleForms.splice(index, 1);
    }
  }

  addScheduleForm() {
    // Initialize a new schedule form
    this.initializeScheduleForm();

    // Push the new schedule form to the array
    this.scheduleForms.push(this.scheduleForm);
  }

  // Function to capture and store form data
  storeFormData() {
    const seatType = this.busSeatForm.get('seatType')?.value;
    const totalSeats = this.busSeatForm.get('totalSeats')?.value;

    // Check if the seatType already exists in storedFormData
    const existingSeat = this.storedFormData.find(
      (busSeat) => busSeat.seatType === seatType
    );

    if (!existingSeat) {
      // If the seatType doesn't exist, add it to storedFormData
      const busSeat: SeatTypeRequest = {
        seatType,
        totalSeats,
      };
      this.storedFormData.push(busSeat);
    } else {
      // If the seatType already exists, you can handle it here (e.g., show an error message).
      // For now, let's just log a message to the console.
      console.log(`Seat type ${seatType} already exists.`);
    }
  }

  removeStoredFormData(index: number) {
    if (index >= 0 && index < this.storedFormData.length) {
      this.storedFormData.splice(index, 1);
    }
  }

  setFormValuesFromJson(jsonData: any): any {
    return new Date(jsonData).toISOString().slice(0, 16);
  }

  getDriverData() {
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
    });
  }
  getBusPathData() {
    this.buspathService.getBusPaths().subscribe((data) => {
      this.busPaths = data;
    });
  }

  restrictMaxValue(formControl: any) {
    const inputValue = formControl.value;
    if (inputValue > 40) {
      formControl.setValue(40);
    } else if (inputValue < 0) {
      formControl.setValue(0);
    }
  }

  restrictMaxValueForUpper(formControl: any) {
    const inputValue = formControl.value;
    if (inputValue > 15) {
      formControl.setValue(15);
    } else if (inputValue < 0) {
      formControl.setValue(0);
    }
  }

  restrictMaxValueValues(formControl: any) {
    const value = this.busSeatForm.get('seatType')?.value;
    const inputValue = formControl.value;

    if(value != 'Sleeper'){
      if (inputValue > 40) {
        formControl.setValue(40);
      } else if (inputValue < 0) {
        formControl.setValue(0);
      }
    }else{
      if (inputValue > 15) {
        formControl.setValue(15);
      } else if (inputValue < 0) {
        formControl.setValue(0);
      }
    }

  }

// Custom validator function to check if arrival time is not less than current date and time
validateArrivalTime(control: AbstractControl) {
  const arrivalTime = new Date(control.value).getTime();
  const currentTime = new Date().getTime();

  if (arrivalTime < currentTime) {
    return { invalidTime: true };
  }

  return null;
}

  validateDepartureArrivalTimes(control: AbstractControl) {
    const departureTime = control.get('departureTime')?.value;
    const arrivalTime = control.get('arrivalTime')?.value;

    if (departureTime === arrivalTime) {
      return { sameTime: true };
    }

    return null;
  }



  calculateCapacity() {
    // Calculate the capacity based on lowerSeatsCount and upperSeatsCount
    const lowerSeats = this.busForm.get('lowerSeatsCount')?.value || 0;
    const upperSeats = this.busForm.get('upperSeatsCount')?.value || 0;
    const capacity = lowerSeats + upperSeats;

    // Update the capacity control
    this.busForm.get('capacity')?.setValue(capacity);
  }

  onSubmit() {
    if (this.busForm.valid) {
      const busData = this.busForm.value;

      if (this.isEditMode) {
        busData['busID'] = this.busID;

        const bus: Bus = {
          busID: busData.busID,
          licensePlate: busData.licensePlate,
          model: busData.model,
          type: busData.type,
          capacity: busData.capacity,
          currentLocation: busData.currentLocation,

          upperSeatsCount: busData.upperSeatsCount,
          lowerSeatsCount: busData.lowerSeatsCount,
        };

        console.log(bus);
        // Update bus data if in edit mode
        this.busService.updateBus(bus).subscribe(() => {
          console.log('bus updated successfully');
          // Now that you have the newBusID, you can create the schedule
          for (const scheduleForm of this.scheduleForms) {
            const scheduleData = scheduleForm.value;
            scheduleData['scheduleID'] = scheduleData.scheduleID || 0;

            const schedule: Schedule = {
              scheduleID: scheduleData.scheduleID,
              driverID: scheduleData.driverID,
              busID: busData.busID,
              pathID: scheduleData.pathID,
              departureTime: scheduleData.departureTime,
              arrivalTime: scheduleData.arrivalTime,
              status: scheduleData.status,
            };
            if (scheduleData.scheduleID > 0) {
              this.scheduleService.updateSchedule(schedule).subscribe(() => {
                console.log('schedule added successfully');
                this.goBack();
              });
            }else{
              this.scheduleService.addSchedule(schedule).subscribe(() => {
                console.log('schedule added successfully');
                this.goBack();
              });
            }
          }
        });
      } else {
        const bus: Bus = {
          licensePlate: busData.licensePlate,
          model: busData.model,
          type: busData.type,
          capacity: busData.capacity,
          currentLocation: busData.currentLocation,

          upperSeatsCount: busData.upperSeatsCount,
          lowerSeatsCount: busData.lowerSeatsCount,
        };

        console.log(bus);

        this.busService.addBusAndGetID(bus).subscribe((newBusID) => {
          console.log('Newly generated busID:', newBusID);
          console.log('bus added successfully');

          bus['busID'] = newBusID;

          const busSeatsData: BusSeatAddRequestDTO = {
            busID: newBusID,
            seatTypes: this.storedFormData,
          };

          this.busseatService.addBusSeats(busSeatsData).subscribe(() => {
            console.log('Bus Seats added successfully');
          });
          for (const scheduleForm of this.scheduleForms) {
            const scheduleData = scheduleForm.value;
            scheduleData['scheduleID'] = scheduleData.scheduleID || 0;
            // Now that you have the newBusID, you can create the schedule
            const schedule: Schedule = {
              scheduleID: scheduleData.scheduleID,
              busID: newBusID,
              pathID: scheduleData.pathID,
              driverID: scheduleData.driverID,
              departureTime: scheduleData.departureTime,
              arrivalTime: scheduleData.arrivalTime,
              status: scheduleData.status,
            };

            console.log(schedule);

            this.scheduleService.addSchedule(schedule).subscribe(() => {
              console.log('schedule added successfully');
              this.goBack();
            });
          }
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }

  getDriverFromDrivers(driverID: number): any {
    return this.drivers.find((driver) => driver.driverID == driverID);
  }

  getBusPathFromBusPaths(pathID: number): any {
    return this.busPaths.find((busPath) => busPath.pathID == pathID);
  }
}
