import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../modals/creditCard';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  private apiUrl = 'https://localhost:44331/api/CreditCard'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // Create a new credit card and return its ID
  createCreditCard(creditCard: CreditCard): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/CreateCreditCard`, creditCard);
  }

  // Get a credit card by ID
  getCreditCard(id: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`);
  }

  // Update a credit card
  updateCreditCard(id: number, creditCard: CreditCard): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, creditCard);
  }

  // Delete a credit card by ID
  deleteCreditCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
