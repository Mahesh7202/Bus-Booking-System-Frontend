import { Component, OnInit } from '@angular/core';
import { UseraccountService } from '../../../services/useraccount.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(public userService: UseraccountService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
      console.log(this.isLoggedIn)
    });

    console.log(this.isLoggedIn)
    if(this.authService.isLoggedIn()){
      this.isLoggedIn = true;
    }else if(this.authService.isLoggedInAsAdmin()){
      this.isAdmin = true;
    }
    console.log(this.isLoggedIn)

  }

  Logout() {
    this.authService.logout();
    this.isAdmin = false;
    this.isLoggedIn = false;

  }
}
