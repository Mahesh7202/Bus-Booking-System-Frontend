// driver.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../modals/driver';
@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = 'https://localhost:44331/api/Driver'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  // Get a driver by ID
  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  // Update an existing driver
  updateDriver(driverData: Driver): Observable<Driver> {
    const id = driverData.driverID;
    return this.http.put<Driver>(`${this.apiUrl}/${id}`, driverData);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  // Delete a driver by ID
  deleteDriver(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
