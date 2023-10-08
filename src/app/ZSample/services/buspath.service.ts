import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusPath } from '../modals/buspath';
@Injectable({
  providedIn: 'root',
})
export class BuspathService {
  private apiUrl = 'https://localhost:44331/api/BusPath'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Add a new bus path
  addBusPath(busPath: BusPath): Observable<BusPath> {
    return this.http.post<BusPath>(this.apiUrl, busPath);
  }

  // Get a bus path by ID
  getBusPathById(id: number): Observable<BusPath> {
    return this.http.get<BusPath>(`${this.apiUrl}/${id}`);
  }

   // Fetch bus paths based on starting and ending points
   getBusPathByPoints(startingPoint: string, endingPoint: string): Observable<BusPath> {
    const url = `${this.apiUrl}/GetBusPathByPoints?startingPoint=${startingPoint}&endingPoint=${endingPoint}`;
    return this.http.get<BusPath>(url);
  }

  // Update an existing bus path
  updateBusPath(busPathData: BusPath): Observable<BusPath> {
    const id = busPathData.pathID;
    return this.http.put<BusPath>(`${this.apiUrl}/${id}`, busPathData);
  }

  // Get all bus paths
  getBusPaths(): Observable<BusPath[]> {
    return this.http.get<BusPath[]>(this.apiUrl);
  }

  // Delete a bus path by ID
  deleteBusPath(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
