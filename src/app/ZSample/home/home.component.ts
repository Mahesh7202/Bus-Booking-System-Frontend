import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuspathService } from '../services/buspath.service';
import { BusPath } from '../modals/buspath';

interface Bus {
  charges: number;
  busName: string;
  source: string;
  busId: number;
  destination: string;
  departureTime: string;
  departureDate: string;
  [key: string]: any;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {


  imageURLs = [
    "../../../assets/bus.jpg",
    "../../../assets/bus.jpg",
    "../../../assets/bus.jpg",
   ];

  //date may be url of an chrome
  // "https://example.com/images/2.jpg",
  // "https://example.com/images/3.jpg"

  paths: BusPath[] = [];
  searchBusesForm!: FormGroup;

  BusName = '';
  source = '';
  destination = '';
  charges = '';
  BusId = '';
  departureDate: string = '';
  showBusDetails: boolean = true;
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  selectedBus: Bus | undefined;
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];

  showForm = false;


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private busPathService: BuspathService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchBusesForm = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      onDate: ['', Validators.required],
    });


    this.busPathService.getBusPaths().subscribe((data) => {
      this.paths = data;

      this.paths.forEach((path, index) => {
        path.imageURL = this.imageURLs[index];
      })

      console.log(this.paths)

    })
  }



  searchBuses(): void {
    console.log(this.searchBusesForm)
    if (this.searchBusesForm.valid) {
      const source = this.searchBusesForm.get('source')?.value;
      const destination = this.searchBusesForm.get('destination')?.value;
      const onDate = this.searchBusesForm.get('onDate')?.value;

      this.router.navigateByUrl(`/bus-ticket/${source}/${destination}/${onDate}`);
    }
  }


}
