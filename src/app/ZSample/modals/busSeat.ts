import { Bus } from "./bus";
import { Schedule } from "./schedule";

export interface BusSeat{
  busSeatID?: number;
  busID?: number;
  seatType: string;
  totalSeats: number;
  seatsAvailable?: number;
  bus?: Bus;
}


export interface SeatData {
  seatType: string;
  totalSeats: number;
  price: number;
  minSeatNumber: number;
  maxSeatNumber: number;
}

export interface SeatInfo {
  seatNumber: number;
  seatType: string;
  price: number;
  status: string;
}


export interface SeatStatus{
  seatID?: number;
  busID: number;
  scheduleID: number;
  schedule?: Schedule;
  seatNumber: string;
  category: string;
  price: number;
  status: string;
}
