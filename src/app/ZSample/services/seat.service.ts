import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeatStatus } from '../modals/busSeat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private apiUrl = 'https://localhost:44331/api/Seat'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // GET: Fetch all seats
  getSeats(): Observable<SeatStatus[]> {
    return this.http.get<SeatStatus[]>(`${this.apiUrl}`);
  }

  // GET: Fetch a single seat by ID
  getSeat(id: number): Observable<SeatStatus> {
    return this.http.get<SeatStatus>(`${this.apiUrl}/${id}`);
  }

  // PUT: Update a seat by ID
  updateSeat(id: number, seat: SeatStatus): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, seat);
  }

  // POST: Create a new seat
  createSeat(seat: SeatStatus): Observable<SeatStatus> {
    return this.http.post<SeatStatus>(`${this.apiUrl}`, seat);
  }

  bookSeats(scheduleId: number,busID: number, seatNumbers: string[]): Observable<any> {
    const body = { scheduleId, busID, seatNumbers };
    return this.http.put(`${this.apiUrl}/Book`, body);
  }

  cancelBooking(scheduleId: number,busID: number, seatNumbers: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = { scheduleId, busID, seatNumbers };
    return this.http.delete(`${this.apiUrl}/CancelBooking`, options);
  }

  getSeatsByScheduleAndBus(scheduleId: number, busId: number): Observable<SeatStatus[]> {
    const url = `${this.apiUrl}/GetByScheduleAndBus?scheduleId=${scheduleId}&busId=${busId}`;
    return this.http.get<SeatStatus[]>(url);
  }

  // DELETE: Delete a seat by ID
  deleteSeat(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
