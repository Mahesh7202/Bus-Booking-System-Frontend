import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if the user is initially authenticated (e.g., based on a token in localStorage)
    this.checkTokenInLocalStorage();
  }

  // Simulate login with user credentials
  login(user: any): Observable<boolean> {
    // Check if the email and password are valid (replace with your authentication logic)
    if (user.email === 'admin@gmail.com' && user.password === 'password') {
      localStorage.setItem('role', 'admin'); // Set the role to 'admin'
      this.isAuthenticatedSubject.next(true); // Update the authentication state
      return of(true); // Return an observable indicating success
    } else {
      localStorage.setItem('email', user.email);
      localStorage.setItem('userId', user.userID); // Set the userId in localStorage
      this.isAuthenticatedSubject.next(true); // Update the authentication state
      return of(true); // Return an observable indicating success
    }
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role'); // Remove the role from localStorage
    this.isAuthenticatedSubject.next(false); // Update the authentication state
  }

  // Check if the user is initially authenticated based on the presence of userId or role in localStorage
  private checkTokenInLocalStorage(): void {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (userId || role === 'admin') {
      this.isAuthenticatedSubject.next(true);
    }
  }


  // Check if a user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  isLoggedInAsAdmin(): boolean {
    return localStorage.getItem('role') !== null;
  }

  // Get the user ID from local storage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getEmail(): string {
    const email = localStorage.getItem('email')
    if(email){
      return email;
    }
    return "durgamahesh145@gmail.com";
  }
}
