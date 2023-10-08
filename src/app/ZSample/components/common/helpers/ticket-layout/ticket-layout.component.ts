import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-ticket-layout',
  templateUrl: './ticket-layout.component.html',
  styleUrls: ['./ticket-layout.component.css']
})
export class TicketLayoutComponent implements OnInit {

  @Input() ticketDelete!: boolean;
  @Input() bookingsData!: any[];

  @Input() deleteItemEvent!: (item: any, items: any[]) => any[];
  @Input() deleteBookingsData!: (item: any) => void;


  activeTabIndex = 0;
  bookingID!: number;


  hover = false;

  constructor(public helperService: HelperService, private bookingService: BookingService){}

  toggleHover() {
    this.hover = !this.hover;
  }


  ngOnInit(){
    this.bookingID = this.bookingsData[0].bookingID;
    console.log(this.bookingsData);

  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }







  deleteTicket(ticketID: number){
    const result = this.deleteItemEvent(ticketID, this.bookingsData);
    console.log(result)
    if(result.length == 0){
      this.deleteBookingsData(this.bookingID);
    }
    this.bookingsData = result;
  }
}
