import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service a singleton and injectable throughout the app
})
export class TicketService {
  private apiUrl = 'https://localhost:44331/api/Ticket'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // Create a new ticket
  createTicket(ticket: any): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/CreateTicket`, ticket);
  }

  // Get a ticket by ID
  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get all tickets
  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Update a ticket
  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ticket);
  }

  // Delete a ticket
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
