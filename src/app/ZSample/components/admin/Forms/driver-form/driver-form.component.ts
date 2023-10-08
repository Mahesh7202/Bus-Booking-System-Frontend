import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from 'src/app/ZSample/services/driver.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent {
  driverForm!: FormGroup;
  isEditMode = false;

  driverID!: number;

  constructor(
    private formBuilder: FormBuilder,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      licenseNumber: ['', Validators.required],
    });

    // Check if we are in edit mode (URL has 'edit/:id')
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // Fetch the driver data by ID and set the form values for editing
        this.driverID = params['id'];
        this.driverService.getDriverById(this.driverID).subscribe(driverData => {
          this.driverForm.patchValue(driverData);
        });
      }
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      const driverData = this.driverForm.value;
      if (this.isEditMode) {
        driverData['driverID'] = this.driverID;
        // Update driver data if in edit mode
        this.driverService.updateDriver(driverData).subscribe(() => {
          console.log('Driver updated successfully');
          // Optionally, navigate back to driver list or any other page
          this.goBack()
        });
      } else {
        // Add driver data if in add mode
        this.driverService.addDriver(driverData).subscribe(() => {
          console.log('Driver added successfully');
          this.goBack()
          // Optionally, navigate back to driver list or any other page
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }
}

