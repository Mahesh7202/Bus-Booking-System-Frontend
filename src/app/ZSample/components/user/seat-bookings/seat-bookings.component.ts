import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { SeatStatus } from 'src/app/ZSample/modals/busSeat';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { SeatHelperService } from 'src/app/ZSample/services/seat-helper.service';
import { SeatService } from 'src/app/ZSample/services/seat.service';

@Component({
  selector: 'app-seat-bookings',
  templateUrl: './seat-bookings.component.html',
  styleUrls: ['./seat-bookings.component.css'],
})
export class SeatBookingsComponent implements OnInit {
  @Input() bookingDetails!: any;

  dataLoaded: boolean = false;

  lowerSeats!: number;
  upperSeats!: number;

  lowerSeatsOrder: any;

  scheduleID!: number;
  busID!: number;
  bookingStatus: boolean = false;

  isAccordion1Collapsed: boolean = false;
  isAccordion2Collapsed: boolean = true;

  private seatStates: { [seatId: string]: boolean } = {};

  bookedSeats: any[] = [];
  fareAmount!: number;
  selectedSeatType!: string;
  preSeatStatus: SeatStatus[] = [];

  isButton1Active: boolean = true;
  seaterGlowActive: boolean = false;

  constructor(
    private helperService: HelperService,
    private busseatService: BusseatService,
    private seatHelperService: SeatHelperService,
    private router: Router,
    private seatService: SeatService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  selectSeatType(seatType: string) {
    this.selectedSeatType = seatType;
  }

  applySeaterGlow() {
    console.log(this.selectedSeatType);
    // Find all elements with the "Seater" type using their class or other identifiers
    const seaterElements =
      this.el.nativeElement.querySelectorAll('.seatType-Seater');

    // Toggle the seaterGlowActive variable to apply or remove the glow effect and scaling
    this.seaterGlowActive = !this.seaterGlowActive;

    // Apply the glow effect and scaling transformation to each "Seater" element
    seaterElements.forEach((element: any) => {
      if (this.seaterGlowActive) {
        this.renderer.addClass(element, 'seater-glow');
      } else {
        this.renderer.removeClass(element, 'seater-glow');
      }
    });
  }

  ngOnInit(): void {
    console.log(this.bookingDetails);

    this.scheduleID = this.bookingDetails.schedule.scheduleID;
    this.busID = this.bookingDetails.schedule.busID;
    this.fareAmount = this.bookingDetails.busPath.distance * 3;


    // this.busseatService.getBusSeatsByBus(this.busID)
    // .pipe(
    //   switchMap((data) => {
    //     this.lowerSeatsOrder = this.seatHelperService.prepareAndGenerateSeats(data, this.fareAmount);
    //     console.log(this.lowerSeatsOrder);
    //     this.dataLoaded = true;

    //     // After lowerSeatsOrder is prepared, switch to seatService
    //     return this.seatService.getSeatsByScheduleAndBus(this.scheduleID, this.busID);
    //   })
    // )
    // .subscribe((data) => {
    //   console.log(data);

    //   // Now you can update seat status based on lowerSeatsOrder
    //   this.updateSeatStatusInList(data, this.lowerSeatsOrder);
    // });

    // this.helperService.getbookingSeatList().subscribe((data) => {
    //   this.bookedSeats = data;
    // });

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

  updateSeatStatusInList(seatList: any[], { lower, upper }: any) {
    const removePrefix = (seatNumber: any) =>
      seatNumber?.replace(/S_[LU]\d+/, '');

    for (const seatType of seatList) {
      for (const seatDataItem of lower) {
        for (const seat of seatDataItem) {
          if (seat.seatNumber == removePrefix(seatType.seatNumber)) {
            console.log(seat.seatNumber);
            console.log(seatType.seatNumber);
          }
        }
        const formattedSeatNumber = removePrefix(seatDataItem.seatNumber);

        // for (const seat of seatTypeArray) {
        //   const formattedListSeatNumber = removePrefix(seat.seatNumber);
        //   if (formattedSeatNumber === formattedListSeatNumber) {
        //     seat.status = seatDataItem.status;
        //     break;
        //   }
        // }
      }
    }

    // console.log(seatData)
  }

  // onMouseEnter() {
  //   this.tooltipService.setTooltip('This is your custom tooltip text.');
  //   this.tooltipService.showTooltip();
  // }

  // onMouseLeave() {
  //   this.tooltipService.hideTooltip();
  // }

  toggleButtons(buttonClicked: any) {
    if (buttonClicked === 1) {
      this.isButton1Active = true;
      this.selectSeatType('Seater');
    } else if (buttonClicked === 2) {
      this.isButton1Active = false;
      this.selectSeatType('Semi-Sleeper');
    }

    this.applySeaterGlow();
  }

  getFormatedDate(date: any): string {
    return this.helperService.formatDateTime(date);
  }

  toggleAccordion1() {
    this.isAccordion1Collapsed = !this.isAccordion1Collapsed;
  }

  toggleAccordion2() {
    this.isAccordion2Collapsed = !this.isAccordion2Collapsed;
  }

  // Function to check if a seat is in the green state
  isSeatGreen(col: number, type: string): boolean {
    const seatId = `S_${type}${col}`;
    return this.seatStates[seatId] === true;
  }

  // Function to update the list
  updateList(newList: any[]): void {
    const observables: any = [];

    newList.forEach((seat) => {
      const seatStatus: SeatStatus = {
        scheduleID: this.scheduleID,
        busID: this.busID,
        seatNumber: seat.seatNumber,
        category: seat.seatType,
        price: seat.seatPrice,
        status: 'pending',
      };

      const observable = this.seatService.createSeat(seatStatus);
      this.helperService.updatebookingSeatList(newList);

      observables.push(observable);
    });

    forkJoin(observables).subscribe(() => {
      console.log('Seats are added to the Seat table');
      this.router.navigate(['/bus-ticket-book', this.scheduleID, this.busID]);
    });
  }

  // Function to toggle the state of a seat
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

  getTotalAmount() {
    let totalAmount = 0;
    for (const seat of this.bookedSeats) {
      totalAmount += seat.seatPrice;
    }
    return totalAmount;
  }
}
