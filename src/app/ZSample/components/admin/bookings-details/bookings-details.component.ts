import { Component } from '@angular/core';
import { bookingDetailsDTO } from 'src/app/ZSample/modals/DTo/BookingDetailsDTO';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { PassengerService } from 'src/app/ZSample/services/passenger.service';
import { TicketService } from 'src/app/ZSample/services/ticket.service';

@Component({
  selector: 'app-bookings-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.css']
})
export class BookingsDetailsComponent {

  totalBookingDetails!: bookingDetailsDTO[];

  remodaledBookingData: any[] = [];
  ticketData: any[] = [];

  columns=["bookingId", "pathName", "busLicensePlate", "busDriver", "numberOfTickets", "userEmail", "userPhoneNumber", "CardNumber", "bookingTime", "totalAmount"]

  dataLoaded: boolean = false;
  showTickets: boolean = false;


  constructor(

    public helperService: HelperService,
    private bookingService: BookingService,
    private ticketService: TicketService,
    private passengerService: PassengerService,
  ) {}



  ngOnInit(){
    this.bookingService.getAllBookingsWithDetails().subscribe((data) => {
      this.totalBookingDetails = data;
      console.log(data)
      this.remodaledBookingData = this.helperService.transformBookingInfo(this.totalBookingDetails);
      console.log(this.totalBookingDetails);
      this.dataLoaded = true;
    });
  }

  transformData(bookingId: number){
    this.ticketData = this.helperService.transformBookingDataForBookingId(this.totalBookingDetails, bookingId);
    console.log(this.ticketData)
  }


  showTable(bookingId: any){


    console.log(this.showTickets)
    this.transformData(bookingId)

    this.bookingService.refreshObservable$.subscribe(() => {
      this.showTickets = !this.showTickets; // Toggle the table to trigger a refresh
    });

  }



}
