import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Booking, BookingTicket } from '../modals/booking';
import { bookingDetailsDTO } from '../modals/DTo/BookingDetailsDTO';



@Injectable({
  providedIn: 'root',
})
export class BookingService {

  private refreshSubject = new Subject<void>();

  // Expose an observable for other components to subscribe to
  refreshObservable$ = this.refreshSubject.asObservable();

  // Emit an event when the button is clicked or when you want to trigger a refresh
  triggerRefresh() {
    this.refreshSubject.next();
  }


  private apiUrl = 'https://localhost:44331/api/Booking'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getBookingWithDetailsByBookingId(bookingId: number): Observable<bookingDetailsDTO> {
    const url = `${this.apiUrl}/GetBookingWithDetails/${bookingId}`;
    return this.http.get<bookingDetailsDTO>(url);
  }

  getAllBookingsWithDetails(): Observable<bookingDetailsDTO[]> {
    const url = `${this.apiUrl}/GetAllBookingsWithDetails`;
    return this.http.get<bookingDetailsDTO[]>(url);
  }

  getBookingsByUserId(userId: number): Observable<bookingDetailsDTO[]> {
    const url = `${this.apiUrl}/GetBookingsByUserId/${userId}`;
    return this.http.get<bookingDetailsDTO[]>(url);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}`);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}`, booking);
  }

  addTicketToBooking(bookingTicket: BookingTicket): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddTicketToBooking`, bookingTicket);
  }

  createBookingWithTickets(booking: Booking): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/CreateBookingWithTickets`, booking);
  }

  sendBookingDataForMail(bookingData: any[], emailIds: string[]): Observable<any> {
    const requestData = {
      bookingDataList: bookingData,
      emailIds: emailIds,
    };
    console.log(requestData)
    return this.http.post<any>(`https://localhost:44331/api/Customer/SendEmailToMultiple`, requestData);
  }

    // Add a method to initiate the deletion sequence
    deletePassengerAndTicket(ticketId: number): Observable<void> {
      console.log(ticketId);

      const url = `${this.apiUrl}/DeletePassengerAndTicket/${ticketId}`;
      console.log(url)
      return this.http.delete<void>(url);
    }

    deletePassengerAndTickets(ticketIds: number[]): Observable<void> {
      const url = `${this.apiUrl}/DeletePassengerAndTickets`;
      return this.http.delete<void>(url, { body: { ticketIds } });
    }

  deleteBookingWithTickets(bookingId: number): Observable<void> {
    const url = `${this.apiUrl}/DeleteBookingWithTickets/${bookingId}`;
    return this.http
      .delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

}
