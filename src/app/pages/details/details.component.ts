import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../types/housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HousingLocationComponent, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  housingLocation: HousingLocation = {
    id: 0,
    name: '',
    city: '',
    state: '',
    photo: '',
    availableUnits: 0,
    wifi: true,
    laundry: true,
  };

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  private route: ActivatedRoute = inject(ActivatedRoute);
  private housingService: HousingService = inject(HousingService);
  // constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.housingLocation = this.housingService.getHousingLocationById(+id)!;
  }

  submitApplication() {
    const { firstName, lastName, email } = this.applyForm.value;
    this.housingService.submitApplication(
      firstName ?? '',
      lastName ?? '',
      email ?? ''
    );
  }
}
