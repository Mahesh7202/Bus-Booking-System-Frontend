import { Component, Input } from '@angular/core';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() bookingData!: any;


  constructor(public helperService: HelperService){}

}
