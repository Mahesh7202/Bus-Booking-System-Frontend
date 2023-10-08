import { Component, Input } from '@angular/core';
import { remodaledBooking } from 'src/app/ZSample/modals/DTo/BookingDetailsDTO';
import { Booking } from 'src/app/ZSample/modals/booking';
import { AuthService } from 'src/app/ZSample/services/auth.service';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrls: ['./show-bookings.component.css'],
})
export class ShowBookingsComponent {
  @Input() deleteBookingData!: boolean;

  bookingDetails!: Booking[];
  remodaledBookingData: remodaledBooking[] = [];

  userId!: number;
  dataLoaded: boolean = false;

  showTicketsTabs: boolean = false;
  ticketData: any = [];
  activeTabIndex = 0;

  constructor(
    public helperService: HelperService,
    private bookingService: BookingService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    let stored = this.authService.getUserId();
    if (stored) {
      this.userId = parseInt(stored);
    }

    this.bookingService.getBookingsByUserId(this.userId).subscribe((data) => {
      this.bookingDetails = data;
      console.log(data);
      this.remodaledBookingData = this.helperService.transformBookingInfo(
        this.bookingDetails
      );
      console.log(this.bookingDetails);
      this.dataLoaded = true;
    });
  }

  showTickets(bookingId: number) {
    this.ticketData = this.helperService.transformBookingDataForBookingId(
      this.bookingDetails,
      bookingId
    );
    this.showTicketsTabs = !this.showTicketsTabs;
    console.log(this.ticketData);
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }










  refreshBookingData(bookingId: number) {
    this.remodaledBookingData = this.remodaledBookingData.filter(
      (data) => data.bookingId != bookingId
    );
  }








  deleteItemEvent(ticketID: any, items: any[]): any[] {
    const res = this.bookingService.deletePassengerAndTicket(ticketID).subscribe(
      () => {
        console.log('Passenger and ticket deleted successfully.');
        return true
      },
      (error) => {
        console.error('Error deleting passenger and ticket:', error);
        // Handle error
        return false;
      }
    );
    if(res){
      items = items.filter((i:any) => i.ticketID !== ticketID);
    }
    return items;
  }














  deleteBooking(bookingId: any) {
    const data: any[] = this.helperService.getTicketsIDs(
      this.bookingDetails,
      bookingId
    );
    console.log(data);
    this.deletePassengerAndRelatedData(data, bookingId);
  }












  deletePassengerAndRelatedData(data: any[], bokingId: number){
       this.deletePassengerAndTickets(data).then(() =>{
        this.deleteBookingsData(bokingId)
       });
  }

  async deletePassengerAndTickets(data: any[]){
    this.bookingService.deletePassengerAndTickets(data).subscribe(
      () => {
        console.log('Passenger and ticket deleted successfully.');
        // Handle success
        // this.refreshTicketData(data);

      },
      (error) => {
        console.error('Error deleting passenger and ticket:', error);
        // Handle error
      }
    );
  }


  async deleteBookingsData(bookingID: number) {
     this.bookingService.deleteBookingWithTickets(bookingID).subscribe(
      () => {
        console.log('booking and ticket deleted successfully.');
        this.refreshBookingData(bookingID);
      },
      (error) => {
        console.error('Error deleting passenger and ticket:', error);
      }
    );
  }
}
