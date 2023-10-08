import { Component, Input } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { SeatStatus } from 'src/app/ZSample/modals/busSeat';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { SchedulerService } from 'src/app/ZSample/services/scheduler.service';
import { SeatHelperService } from 'src/app/ZSample/services/seat-helper.service';
import { SeatService } from 'src/app/ZSample/services/seat.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent {

  lowerSeatsOrder: any;
  isAccordion1Collapsed: boolean = false;
  isAccordion2Collapsed: boolean = true;

   @Input() busID!: number;
   @Input() scheduleID!: number;
   @Input() fareAmount!: number;


  preSeatStatus: SeatStatus[] = [];
  dataLoaded: boolean = false;






  seatStates: { [seatId: string]: boolean } = {};
  selectedSeatType!: string;
  bookedSeats: any[] = []; // Example: Seat 3 is booked
  bookingStatus: boolean = false;

  constructor(
    private seatService: SeatService,
    private busseatService: BusseatService,
    private scheduleService: SchedulerService,
    public helperService: HelperService,
    private seatHelperService: SeatHelperService,
  ) {}




  ngOnInit(){


    this.seatService
      .getSeatsByScheduleAndBus(this.scheduleID, this.busID)
      .pipe(
        catchError((error) => {
          // Handle the error, you can log it or perform other error-specific actions here.
          console.error('Error while getting seats:', error);
          return of(null); // Return a new observable to continue the stream with null data
        }),
        switchMap((data) => {
          if (data !== null) {
            // Continue with the rest of the code if data is not null
            this.preSeatStatus = data;
            console.log(this.preSeatStatus);
          }

          return this.busseatService.getBusSeatsByBus(this.busID);

        })
      )
      .subscribe((data) => {
        this.lowerSeatsOrder = this.seatHelperService.prepareAndGenerateSeats(
          data,
          this.fareAmount,
          this.preSeatStatus
        );
        console.log(this.lowerSeatsOrder);
        this.dataLoaded = true;
      });

  }

  isSeatGreen(col: number, type: string): boolean {
    const seatId = `S_${type}${col}`;
    return this.seatStates[seatId] === true;
  }


  toggleSeatState(col: any, type: string): void {
    console.log('clcicking');
    const seatId = `S_${type}${col.seatNumber}`;
    this.seatStates[seatId] = !this.seatStates[seatId];
    console.log(this.seatStates[seatId]);

    if (this.seatStates[seatId] && col.status == 'available') {
      const seatAndPrice = {
        seatNumber: seatId,
        seatType: col.seatType,
        seatPrice: col.price,
      };
      this.bookedSeats.push(seatAndPrice);
      this.bookingStatus = true;
      console.log(this.bookedSeats);
    } else {
      this.bookedSeats = this.bookedSeats.filter(
        (id) => seatId != id.seatNumber
      );
      console.log(this.bookedSeats);
    }

    if (this.bookedSeats.length < 1) {
      this.bookingStatus = false;
    }
  }




}
