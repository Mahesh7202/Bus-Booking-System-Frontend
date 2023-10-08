import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../modals/bus';
import { BusAssignDataDTO } from '../modals/DTo/BusAssignDataDTO';
import { BusAssignedDataDTO } from '../modals/DTo/BusAssignedDataDTO';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private apiUrl = 'https://localhost:44331/api/Bus'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Add a new bus and get the newly generated busID
  addBusAndGetID(bus: Bus): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/AddAndGetID`, bus);
  }

  getAllBusAssignData(): Observable<BusAssignedDataDTO[]> {
    return this.http.get<BusAssignedDataDTO[]>(`${this.apiUrl}/getAllBusesWithSchedulesAndDrivers`);
  }

  getBusAssignData(busID: number): Observable<BusAssignDataDTO[]> {
    return this.http.get<BusAssignDataDTO[]>(`${this.apiUrl}/getBusAssignData/${busID}`);
  }

  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  getBusById(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${this.apiUrl}/${id}`);
  }

  updateBus(busData: Bus): Observable<Bus> {
    const id = busData.busID;
    return this.http.put<Bus>(`${this.apiUrl}/${id}`, busData);
  }

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  deleteBus(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
