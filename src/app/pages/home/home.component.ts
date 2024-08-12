import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { HousingLocation } from '../../types/housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  ngOnInit() {
    const _this = this;
    async function fetchApi() {
      const res = await _this.housingService.getAllHousingLocations();
      _this.housingLocationList = res;
    }
    fetchApi();
  }

  onSearchHousingLocation(name: string) {
    this.housingLocationList = this.housingService.searchHousingLocations(name);
  }

  onNofity(event: HousingLocation) {
    console.log('==emit event', event);
  }
}
