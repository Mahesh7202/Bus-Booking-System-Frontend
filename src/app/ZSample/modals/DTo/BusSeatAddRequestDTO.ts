
export interface BusSeatAddRequestDTO{
  busID: number;
  seatTypes: SeatTypeRequest[];
}


export interface SeatTypeRequest{
  seatType: string;
  totalSeats: number;
}
