import { Passenger } from "./passenger";
import { Schedule } from "./schedule";

export interface Ticket{
  TicketID?: number;
  PassengerID: number;
  Passenger?: Passenger;
  ScheduleID: number;
  Schedule?: Schedule;
  SeatNumber: string;
  FareAmount: number;
  BookingTime: Date;
  Status: string;

}
