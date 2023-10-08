import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusPath } from 'src/app/ZSample/modals/buspath';
import { BuspathService } from 'src/app/ZSample/services/buspath.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buspath-details',
  templateUrl: './buspath-details.component.html',
  styleUrls: ['./buspath-details.component.css']
})
export class BuspathDetailsComponent {

  buspaths: BusPath[] = [];
  columns: string[] = ['pathName', 'startingPoint', 'endingPoint', 'distance'];
  dataLoaded: boolean = false;

  constructor(
    private buspathService: BuspathService,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    console.log("here on inir")
    this.fetchDriverData();
  }


  editFunction(item: any){
    const id = item.pathID;
    this.router.navigateByUrl(`/admin/buspath-details/edit/${id}`);
  }

  deleteItemEvent(item: any, items: any[]): any[] {
    const pathID = item.pathID;
    console.log(item)
    this.buspathService.deleteBusPath(pathID).subscribe(() => {
      console.log("passenger data deleted")
    })
    items = items.filter((i:any) => i.pathID !== pathID);

    return items;
  }


  fetchDriverData() {
    // Assuming you have a method in DriverService to fetch driver data
    this.buspathService.getBusPaths().subscribe((data: BusPath[]) => {
      this.buspaths = data;
      console.log(data)
      this.dataLoaded = true;
    });
  }
}

