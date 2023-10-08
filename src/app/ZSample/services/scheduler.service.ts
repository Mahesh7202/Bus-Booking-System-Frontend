import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../modals/schedule';
import { BusPath } from '../modals/buspath';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private refreshSubject = new Subject<void>();

  // Expose an observable for other components to subscribe to
  refreshObservable$ = this.refreshSubject.asObservable();

  // Emit an event when the button is clicked or when you want to trigger a refresh
  triggerRefresh() {
    this.refreshSubject.next();
  }

  private apiUrl = 'https://localhost:44331/api/Schedule';

  constructor(private http: HttpClient) {}


  // Add a new schedule
  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  // Get a schedule by ID
  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  getSchedulesByBusID(busID: number): Observable<Schedule[]> {
    const url = `${this.apiUrl}/ByBusId/${busID}`;
    return this.http.get<Schedule[]>(url);
  }

  getSchedulesByIds(scheduleIds: number[]): Observable<Schedule[]> {
    const request = { ScheduleIds: scheduleIds };
    return this.http.post<Schedule[]>(`${this.apiUrl}/get-schedules-by-ids`, request);
  }

  getSchedulesByBusPath(pathID: number): Observable<any[]> {
    const url = `${this.apiUrl}/ByBusPath/${pathID}`;
    return this.http.get<any[]>(url);
  }

  getSchedulesByBusPathAndArrivalDate(busPath: BusPath, arrivalDate: string): Observable<any> {
    const busPathID = busPath.pathID;
    const formattedDate = new Date(arrivalDate).toISOString().slice(0, 10);
    const url = `${this.apiUrl}/ByBusPathAndArrivalDate/${busPathID}/${formattedDate}`;
    return this.http.get(url);
  }

  // Update an existing schedule
  updateSchedule(scheduleData: Schedule): Observable<Schedule> {
    const id = scheduleData.scheduleID;
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, scheduleData);
  }

  // Get all schedules
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  // Delete a schedule by ID
  deleteSchedule(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }



  getSchedulesByBusAndPath(busID: number, pathID: number): Observable<Schedule[]> {
    const url = `${this.apiUrl}/ByBusAndPath/${busID}/${pathID}`;
    return this.http.get<Schedule[]>(url);
  }
}
