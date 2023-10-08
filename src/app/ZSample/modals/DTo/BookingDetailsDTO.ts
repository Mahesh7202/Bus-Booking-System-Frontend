// export interface bookingDetailsDTO{
//   bookedSeats: string[];
// }

import { CreditCard } from "../creditCard";
import { UserAccount } from "../useraccount";

import { Ticket } from "../ticket";



export interface bookingDetailsDTO{
  bookingID: number;
  userID: number;
  userAccount: UserAccount;
  bookingTime: Date;
  creditCardID: number;
  creditCard: CreditCard;
  totalAmount: number;
  ticketIDs: number[];
}



export interface remodaledBooking{
    bookingId: number;
    userEmail: string;
    userPhoneNumber: number;
    pathName: string;
    startingPoint: number;
    arrivalTime: Date;
    destinationPoint: number;
    departureTime: Date;
    busLicensePlate: number;
    busDriver: string;
    numberOfTickets: number;
    CardNumber: string;
    bookingTime: Date;
    totalAmount: number;
}



