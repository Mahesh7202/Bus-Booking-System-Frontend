import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { remodaledBooking } from 'src/app/ZSample/modals/DTo/BookingDetailsDTO';
import { Booking } from 'src/app/ZSample/modals/booking';
import { AuthService } from 'src/app/ZSample/services/auth.service';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.css']
})
export class BookingSuccessComponent {

  bookingDetails!: Booking[];
  remodaledBookingData: remodaledBooking[] = [];

  userId!: number;
  dataLoaded: boolean = false;

  bookingID!: number;

  constructor(
    public helperService: HelperService,
    private bookingService: BookingService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    let stored = this.authService.getUserId();
    if (stored) {
      this.userId = parseInt(stored);
      console.log(this.userId)
    }

    this.route.params.subscribe((params) => {
      this.bookingID = params['bookingID']
    });



    this.bookingService.getBookingsByUserId(this.userId).subscribe((data) => {
      this.bookingDetails = data;
      console.log(data);
      this.remodaledBookingData = this.helperService.transformBookingDataForBookingId(
        this.bookingDetails,
        this.bookingID
      );
      console.log(this.remodaledBookingData);
      this.dataLoaded = true;
    });
  }



}
