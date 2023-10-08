import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from 'src/app/ZSample/modals/useraccount';
import { UseraccountService } from 'src/app/ZSample/services/useraccount.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  userAccount: UserAccount[] = [];
  columns: string[] = ['email', 'phoneNumber', 'password'];
  dataLoaded: boolean = false;



  constructor(
    private userAccountService: UseraccountService,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    console.log("here on inir")
    this.fetchDriverData();
  }


  editFunction(item: any){
    const id = item.UserAccountID;
    this.router.navigateByUrl(`/admin/user-details/edit/${id}`);
  }

  deleteItemEvent(item: any, items: any[]): any[] {
    const UserAccountID = item.UserAccountID;
    console.log(item)
    this.userAccountService.deleteUserAccount(UserAccountID).subscribe(() => {
      console.log("UserAccount data deleted")
    })
    items = items.filter((i:any) => i.UserAccountID !== UserAccountID);

    return items;
  }


  fetchDriverData() {
    // Assuming you have a method in DriverService to fetch driver data
    this.userAccountService.getUserAccounts().subscribe((data: UserAccount[]) => {
      this.userAccount = data;
      console.log(data)
      this.dataLoaded = true;
    });
  }
}
