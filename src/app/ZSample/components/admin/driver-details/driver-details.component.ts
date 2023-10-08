import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/ZSample/modals/driver';
import { DriverService } from 'src/app/ZSample/services/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css'],
})
export class DriverDetailsComponent {

  drivers: Driver[] = [];
  columns: string[] = ['firstName', 'lastName', 'contactNumber', 'licenseNumber'];
  dataLoaded: boolean = false;

  constructor(
    private driverService: DriverService,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    console.log("here")
    this.fetchDriverData();
  }


  editFunction(item: any){
    const id = item.driverID;
    this.router.navigateByUrl(`/admin/driver-details/edit/${id}`);
  }

  deleteItemEvent(item: any, items: any[]): any[] {
    const driverID = item.passengerID;
    console.log(item)
    this.driverService.deleteDriver(driverID).subscribe(() => {
      console.log("passenger data deleted")
    })
    items = items.filter((i:any) => i.driverID !== driverID);

    return items;
  }

  fetchDriverData() {
    // Assuming you have a method in DriverService to fetch driver data
    this.driverService.getDrivers().subscribe((data: Driver[]) => {
      this.drivers = data;
      console.log(data)
      this.dataLoaded = true;
    });
  }
}
