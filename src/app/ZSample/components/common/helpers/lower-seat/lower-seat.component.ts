import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lower-seat',
  templateUrl: './lower-seat.component.html',
  styleUrls: ['./lower-seat.component.css'],
})
export class LowerSeatComponent implements OnInit {
  @Input() lowerSeatsOrder!: any;
  @Input() toggleSeatState!: (col: any, type: string) => void;


  private seatStates: { [seatId: string]: boolean } = {};

  selectedSeatType!: string;
  bookingStatus: boolean = false;

  constructor() {}

  ngOnInit() {}

  checkSeats(col: number, type: string) {
    const seatId = `S_${type}${col}`;
    return this.seatStates[seatId] === true;
  }
}
