import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upper-seat',
  templateUrl: './upper-seat.component.html',
  styleUrls: ['./upper-seat.component.css'],
})
export class UpperSeatComponent {
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
