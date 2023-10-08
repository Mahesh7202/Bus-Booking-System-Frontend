import { Component } from '@angular/core';
import { UseraccountService } from 'src/app/ZSample/services/useraccount.service';// Import the service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-useraccount-form',
  templateUrl: './useraccount-form.component.html',
  styleUrls: ['./useraccount-form.component.css']
})
export class UseraccountFormComponent {
  userAccountForm!: FormGroup;
  isEditMode = false;
  passwordVisible: boolean = false;

  userID!: number;

  constructor(
    private userAccountService: UseraccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    ) {}

  ngOnInit() {
    this.userAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.route.params.subscribe(params => {
      if (params['userID']) {
        this.isEditMode = true;
        // Fetch the driver data by ID and set the form values for editing
        this.userID = params['userID'];
        this.userAccountService.getUserAccount(this.userID).subscribe(userData => {
          this.userAccountForm.patchValue(userData);
        });
      }
    });
  }





  onSubmit() {
    if (this.userAccountForm.valid) {
      console.log('Driver updated successfully');

      const userAccountData = this.userAccountForm.value;
      if (this.isEditMode) {
        userAccountData['passengerID'] = this.userID
        // Update driver data if in edit mode
        this.userAccountService.updateUserAccount(userAccountData).subscribe(() => {
          console.log('Driver updated successfully');
          // Optionally, navigate back to driver list or any other page
          this.goBack()
        });
      } else {
        // Add driver data if in add mode
        this.userAccountService.createUserAccount(userAccountData).subscribe(() => {
          console.log('Driver added successfully');
          this.goBack()
          // Optionally, navigate back to driver list or any other page

        });
      }
    }
  }


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  goBack() {
    this.location.back();
  }
}

