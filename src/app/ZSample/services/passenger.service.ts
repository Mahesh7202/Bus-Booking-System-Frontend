// passenger.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../modals/passenger';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiUrl = 'https://localhost:44331/api/Passenger'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Add a new passenger
  addPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(this.apiUrl, passenger);
  }

  addPassengers(passengers: Passenger[]): Observable<number[]> {
    const passengerListRequest = { Passengers: passengers };
    return this.http.post<number[]>(`${this.apiUrl}/AddPassengers`, passengerListRequest);
  }

  // Get a passenger by ID
  getPassengerById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiUrl}/${id}`);
  }

  // Update an existing passenger
  updatePassenger(passengerData: Passenger): Observable<Passenger> {
    const id = passengerData.passengerID;
    return this.http.put<Passenger>(`${this.apiUrl}/${id}`, passengerData);
  }

  // Get a list of passengers
  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl);
  }

   // Delete a passenger by ID
   deletePassenger(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
