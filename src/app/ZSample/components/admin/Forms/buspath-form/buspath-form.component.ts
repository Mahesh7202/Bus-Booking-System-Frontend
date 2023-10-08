import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BuspathService } from 'src/app/ZSample/services/buspath.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buspath-form',
  templateUrl: './buspath-form.component.html',
  styleUrls: ['./buspath-form.component.css'],
})
export class BuspathFormComponent {
  busPathForm!: FormGroup;
  isEditMode = false;

  pathID!: number;


  constructor(
    private formBuilder: FormBuilder,
    private busPathService: BuspathService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.busPathForm = this.formBuilder.group({
      pathName: ['', Validators.required],
      startingPoint: ['', Validators.required],
      endingPoint: ['', Validators.required],
      distance: [0, [Validators.required, Validators.min(0)]],
    });

    // Check if we are in edit mode (URL has 'edit/:id')
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        // Fetch the buspath data by ID and set the form values for editing
        this.pathID = params['id'];
        this.busPathService.getBusPathById(this.pathID).subscribe((buspathData) => {
          this.busPathForm.patchValue(buspathData);
        });
      }
    });

    // Subscribe to changes in the "Starting Point" field
    this.busPathForm.get('startingPoint')?.valueChanges.subscribe(() => {
      this.updatePathName();
    });

    // Subscribe to changes in the "Ending Point" field
    this.busPathForm.get('endingPoint')?.valueChanges.subscribe(() => {
      this.updatePathName();
    });
  }

  updatePathName() {
    const startingPoint = this.busPathForm.get('startingPoint')?.value;
    const endingPoint = this.busPathForm.get('endingPoint')?.value;

    // Create the path name based on starting and ending points
    const pathName = `${startingPoint} to ${endingPoint}`;

    // Set the path name in the form control
    this.busPathForm.get('pathName')?.setValue(pathName);
  }

  onSubmit() {
    if (this.busPathForm.valid) {
      const buspathData = this.busPathForm.value;
      if (this.isEditMode) {
        buspathData['pathID'] = this.pathID

        // Update buspath data if in edit mode
        this.busPathService.updateBusPath(buspathData).subscribe(() => {
          console.log('buspath updated successfully');
          // Optionally, navigate back to buspath list or any other page
          this.goBack()
        });
      } else {
        // Add buspath data if in add mode
        this.busPathService.addBusPath(buspathData).subscribe(() => {
          console.log('buspath added successfully');
          this.goBack()
          // Optionally, navigate back to buspath list or any other page
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
