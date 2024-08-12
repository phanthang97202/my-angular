import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HousingLocation } from '../../types/housinglocation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="listing" (click)="onClickHousingLocation()">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <a [routerLink]="['/detail', housingLocation.id]">
        <h2 class="listing-heading">
          {{ housingLocation.name }}
        </h2>
      </a>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  @Output() notify: EventEmitter<HousingLocation> =
    new EventEmitter<HousingLocation>();

  onClickHousingLocation() {
    this.notify.emit(this.housingLocation);
  }
}
