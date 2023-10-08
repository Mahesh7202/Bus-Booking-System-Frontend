import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusSeat } from '../modals/busSeat';
import { BusSeatAddRequestDTO } from '../modals/DTo/BusSeatAddRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class BusseatService {
  private apiUrl = 'https://localhost:44331/api/Busseat'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all bus seats
  getAllBusSeats(): Observable<BusSeat[]> {
    return this.http.get<BusSeat[]>(this.apiUrl);
  }

  reduceSeats(busId: number, seatTypes: string[]): Observable<any> {
    const body = { busId, seatTypes };
    return this.http.put(`${this.apiUrl}/ReduceSeats`, body);
  }

  increaseSeats(busId: number, seatTypes: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = { busId, seatTypes };
    return this.http.put(`${this.apiUrl}/IncreaseSeats`, body, options);
  }


  // Get a single bus seat by ID
  getBusSeatById(id: number): Observable<BusSeat> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BusSeat>(url);
  }

   // Define a method to get bus seats by busID
   getBusSeatsByBus(busID: number): Observable<any> {
    const url = `${this.apiUrl}/ByBus/${busID}`;
    return this.http.get(url);
  }

  // Add new bus seats to a bus
  addBusSeats(request: BusSeatAddRequestDTO): Observable<any> {
    const url = `${this.apiUrl}/AddSeats`;
    return this.http.post(url, request);
  }

  // Update a bus seat
  updateBusSeat(id: number, busSeat: BusSeat): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, busSeat);
  }

  // Delete a bus seat by ID
  deleteBusSeat(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
