import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HousingLocation } from '../../types/housinglocation';
import { RouterLink } from '@angular/router';
import { PopupComponent } from '../../components/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink, PopupComponent],
  template: `
    <section class="listing" (click)="onClickHousingLocation()">
      <img
        (click)="onOpenPopup($event)"
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
    <popup
      [image]="housingLocation.photo"
      *ngIf="isOpen"
      (onClosePopup)="handleClosePopup()"
    ></popup>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  @Output() notify: EventEmitter<HousingLocation> =
    new EventEmitter<HousingLocation>();

  isOpen = false;

  onClickHousingLocation() {
    this.notify.emit(this.housingLocation);
  }

  onOpenPopup(event: Event) {
    // event.stopPropagation();
    this.isOpen = true;
    console.log('click open', this.isOpen);
  }

  handleClosePopup() {
    this.isOpen = false;
  }
}
