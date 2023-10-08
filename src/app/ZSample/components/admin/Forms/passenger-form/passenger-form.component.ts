// passenger-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PassengerService } from 'src/app/ZSample/services/passenger.service';
@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
})
export class PassengerFormComponent implements OnInit {

  passengerForm!: FormGroup;
  isEditMode = false;

  passengerID!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private passengerService: PassengerService) {}

  ngOnInit() {
    this.passengerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // Fetch the driver data by ID and set the form values for editing
        this.passengerID = params['id'];
        this.passengerService.getPassengerById(this.passengerID).subscribe(passengerData => {
          this.passengerForm.patchValue(passengerData);
        });
      }
    });
  }

  onSubmit() {
    if (this.passengerForm.valid) {
      console.log('Driver updated successfully');

      const passengerData = this.passengerForm.value;
      if (this.isEditMode) {
        passengerData['passengerID'] = this.passengerID
        // Update driver data if in edit mode
        this.passengerService.updatePassenger(passengerData).subscribe(() => {
          console.log('Driver updated successfully');
          // Optionally, navigate back to driver list or any other page
          this.goBack()
        });
      } else {
        // Add driver data if in add mode
        this.passengerService.addPassenger(passengerData).subscribe(() => {
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
