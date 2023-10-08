import { Component, Input, OnInit } from '@angular/core';
import { BusSeat } from 'src/app/ZSample/modals/busSeat';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{

  showBookingtab: boolean = false;
  bookingDetails: any;

  @Input() busData: any;
  @Input() busPaths: any;

  fareAmount!: number;
  busID!: number;
  busSeatData: BusSeat[] = [];


  constructor(
    private helperService: HelperService,
    private busseatService: BusseatService
  ){
  }


  getStatusClass() {
    switch (this.busData.status.toLowerCase()) {
      case 'active':
        return 'status-green';
      case 'pending':
        return 'status-violet';
      case 'cancelled':
        return 'status-red';
      default:
        return '';
    }
  }


  ngOnInit(): void {
    this.bookingDetails = {
      schedule: this.busData,
      busPath: this.busPaths
    }

    this.busID = this.bookingDetails.schedule.busID;
    this.fareAmount = this.bookingDetails.busPath.distance * 3;

    this.busseatService.getBusSeatsByBus(this.busID).subscribe((data) => {
      this.busSeatData = data;
    });

  }


  showBooking(){
    this.showBookingtab = !this.showBookingtab
  }

  getFormatedDate(formatDate: any): string{

    return this.helperService.formatDateTime(formatDate);
  }

}
