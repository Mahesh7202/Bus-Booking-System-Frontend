import { CreditCard } from "./creditCard";
import { UserAccount } from "./useraccount"

// booking.model.ts
export interface Booking {
  bookingID?: number;
  userID: number;
  creditCardID: number;
  bookingTime: Date;
  totalAmount: number;
  ticketIDs?: number[]; // Optional if you want to include ticket IDs in requests
}

export interface BookingTicket {
  bookingID: number;
  ticketID: number;
}


