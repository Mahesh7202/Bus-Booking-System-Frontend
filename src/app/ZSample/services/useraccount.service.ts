import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../modals/useraccount';

@Injectable({
  providedIn: 'root'
})
export class UseraccountService {
  private baseUrl = 'https://localhost:44331/api/UserAccount';

  constructor(private http: HttpClient) { }

  getUserAccounts(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(`${this.baseUrl}`);
  }

  getUserAccount(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.baseUrl}/${id}`);
  }

  createUserAccount(userAccount: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${this.baseUrl}`, userAccount);
  }

  updateUserAccount(userAccount: UserAccount): Observable<any> {
    const userID = userAccount.userID
    return this.http.put(`${this.baseUrl}/${userID}`, userAccount);
  }

  deleteUserAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  login(emailOrMobile: string, password: string): Observable<any> {
    const loginModel = { EmailOrMobile: emailOrMobile, Password: password };
    return this.http.post<any>(this.baseUrl+"/Login", loginModel);
  }




}



