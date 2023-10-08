import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusAssignDataDTO } from '../modals/DTo/BusAssignDataDTO';
import { Schedule } from '../modals/schedule';
import { Bus } from '../modals/bus';
import { BusAssignedDataDTO } from '../modals/DTo/BusAssignedDataDTO';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private bookingSeatList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  getbookingSeatList(): Observable<any[]> {
    return this.bookingSeatList.asObservable();
  }

  updatebookingSeatList(newbookingSeatList: any[]): void {
    this.bookingSeatList.next(newbookingSeatList);
  }

  constructor(private http: HttpClient) {}

  transformData(busAssignedData: BusAssignedDataDTO[], busID: number): any {
    const data = busAssignedData.find(
      (item) => item.bus.busID === busID
    )?.schedules;
    if (data) {
      return this.transformScheduleData(data);
    }
  }

  transformBookingInfo(bookingDetails: any[]): any[] {
    return bookingDetails.map((booking) => ({
      bookingId: booking.bookingID,
      userEmail: booking.userAccount.email,
      userPhoneNumber: booking.userAccount.phoneNumber,
      pathName: booking.tickets[0]?.schedule.busPath.pathName,
      startingPoint: booking.tickets[0]?.schedule.busPath.startingPoint,
      arrivalTime: this.formatDateTime(
        booking.tickets[0]?.schedule.arrivalTime
      ),
      destinationPoint: booking.tickets[0]?.schedule.busPath.endingPoint,
      departureTime: this.formatDateTime(
        booking.tickets[0]?.schedule.departureTime
      ),
      busLicensePlate: booking.tickets[0]?.schedule.bus.licensePlate,
      busDriver:
        booking.tickets[0]?.schedule.driver.firstName +
        ' ' +
        booking.tickets[0]?.schedule.driver.lastName,
      numberOfTickets: booking.tickets.length,
      CardNumber: booking.creditCard.cardNumber,
      bookingTime: this.formatDateTime(booking.bookingTime),
      totalAmount: booking.totalAmount,
    }));
  }

  transformBookingDataForBookingIdForOne(matchingBooking: any): any {
    let bookingList: any[] = [];
    const email: any[] = [];
    // Find the booking that matches the targetBookingId

    if (matchingBooking) {
      matchingBooking.tickets.forEach((ticket: any) => {
        const details = {
          bookingTime: this.formatDateTime(matchingBooking.bookingTime),
          pathName:
            matchingBooking.tickets[0].schedule.busPath.pathName.toUpperCase(),
          startingPoint:
            matchingBooking.tickets[0].schedule.busPath.startingPoint,
          arrivalTime: this.formatDateTime(
            matchingBooking.tickets[0].schedule.arrivalTime
          ),
          destinationPoint:
            matchingBooking.tickets[0].schedule.busPath.endingPoint,
          departureTime: this.formatDateTime(
            matchingBooking.tickets[0].schedule.departureTime
          ),
          busLicensePlate: matchingBooking.tickets[0].schedule.bus.licensePlate,
          modal: matchingBooking.tickets[0].schedule.bus.model,
          type: matchingBooking.tickets[0].schedule.bus.type,
          ticketID: ticket.ticketID,
          seatNumber: ticket.seatNumber,
          email: ticket.passenger.email,
          gender: ticket.passenger.gender.toUpperCase(),
          phoneNumber: ticket.passenger.contactNumber,
          age: ticket.passenger.age,
          name:
            ticket.passenger.firstName.toUpperCase() +
            ' ' +
            ticket.passenger.lastName.toUpperCase(),
          seatAmount: ticket.fareAmount,
        };

        email.push(ticket.passenger.email);

        bookingList.push(details);
      });
    }

    return {
      bookingDataList: bookingList,
      email: email,
    };
  }

  transformBookingDataForBookingId(
    bookingData: any[],
    targetBookingId: number
  ): any {
    const bookingList: any[] = [];

    // Find the booking that matches the targetBookingId
    const matchingBooking = bookingData.find(
      (booking) => booking.bookingID == targetBookingId
    );
    console.log(targetBookingId);


    if (matchingBooking) {
      console.log(matchingBooking);

      matchingBooking.tickets.forEach((ticket: any) => {
        const details = {
          bookingID: targetBookingId,
          bookingTime: matchingBooking.bookingTime,
          pathName: matchingBooking.tickets[0].schedule.busPath.pathName,
          startingPoint:
            matchingBooking.tickets[0].schedule.busPath.startingPoint,
          arrivalTime: matchingBooking.tickets[0].schedule.arrivalTime,
          destinationPoint:
            matchingBooking.tickets[0].schedule.busPath.endingPoint,
          departureTime: matchingBooking.tickets[0].schedule.departureTime,
          busLicensePlate: matchingBooking.tickets[0].schedule.bus.licensePlate,
          modal: matchingBooking.tickets[0].schedule.bus.model,
          type: matchingBooking.tickets[0].schedule.bus.type,
          ticketID: ticket.ticketID,
          passengerID: ticket.passenger.passengerID,
          seatNumber: ticket.seatNumber,
          email: ticket.passenger.email,
          gender: ticket.passenger.gender,

          phoneNumber: ticket.passenger.contactNumber,
          age: ticket.passenger.age,
          name: ticket.passenger.firstName + ' ' + ticket.passenger.lastName,
          seatAmount: ticket.fareAmount,
        };

        bookingList.push(details);
      });
    }
    console.log(bookingList);

    return bookingList;
  }

  transformScheduleData(data: Schedule[]) {
    const transformedData: Schedule[] = [];
    if (data) {
      for (const item of data) {
        const busSchedule: any = {
          scheduleID: item.scheduleID,
          driverID: item.driver?.driverID,
          pathID: item.busPath?.pathID,
          licensePlate: item.bus?.licensePlate,
          driverName: `${item.driver?.lastName} ${item.driver?.firstName}`,
          contactNumber: item.driver?.contactNumber,
          pathName: item.busPath?.pathName,
          distance: item.busPath?.distance,
          departureTime: this.formatDateTime(item.departureTime),
          arrivalTime: this.formatDateTime(item.arrivalTime),
          status: item.status,
        };

        transformedData.push(busSchedule);
      }
    }
    return transformedData;
  }

  transformScheduleDataForTable(data: Schedule[]) {
    const transformedData: Schedule[] = [];
    if (data) {
      for (const item of data) {
        const busSchedule: any = {
          driverID: item.driver?.driverID,
          pathID: item.busPath?.pathID,
          licensePlate: item.bus?.licensePlate,
          driverName: `${item.driver?.lastName} ${item.driver?.firstName}`,
          contactNumber: item.driver?.contactNumber,
          pathName: item.busPath?.pathName,
          distance: item.busPath?.distance,
          departureTime: item.departureTime,
          arrivalTime: item.arrivalTime,
          status: item.status,
        };

        transformedData.push(busSchedule);
      }
    }
    return transformedData;
  }

  formatDateTime(dateString: Date): string {
    const date = new Date(dateString);

    // Extract date components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the date and time
    const formattedDate = `${day} ${month}`;
    const formattedTime = `${hours}:${minutes}`;

    return formattedDate + ' ' + formattedTime;
  }

  getTicketsIDs(bookingData: any[], targetBookingId: number): any {
    const ticketIds: any[] = [];

    // Find the booking that matches the targetBookingId
    const matchingBooking = bookingData.find(
      (booking) => booking.bookingID === targetBookingId
    );

    if (matchingBooking) {
      console.log(matchingBooking);

      matchingBooking.tickets.forEach((ticket: any) => {
        ticketIds.push(ticket.ticketID);
      });
    }

    return ticketIds;
  }
}
