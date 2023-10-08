import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/ZSample/modals/passenger';
import { PassengerService } from 'src/app/ZSample/services/passenger.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent {

  passengers: Passenger[] = [];
  columns: string[] = ['firstName', 'lastName', 'gender', 'age', 'email', 'contactNumber'];
  dataLoaded: boolean = false;



  constructor(
    private passengerService: PassengerService,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    console.log("here on inir")
    this.fetchDriverData();
  }


  editFunction(item: any){
    const id = item.passengerID;
    this.router.navigateByUrl(`/admin/passenger-details/edit/${id}`);
  }

  deleteItemEvent(item: any, items: any[]): any[] {
    const passengerID = item.passengerID;
    console.log(item)
    this.passengerService.deletePassenger(passengerID).subscribe(() => {
      console.log("passenger data deleted")
    })
    items = items.filter((i:any) => i.passengerID !== passengerID);

    return items;
  }


  fetchDriverData() {
    // Assuming you have a method in DriverService to fetch driver data
    this.passengerService.getPassengers().subscribe((data: Passenger[]) => {
      this.passengers = data;
      console.log(data)
      this.dataLoaded = true;
    });
  }
}
