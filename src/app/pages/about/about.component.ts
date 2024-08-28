import { Component } from '@angular/core';
import { ClickTrackerDirective } from '../../directives/click-tracker.directive';

@Component({
  selector: 'about',
  standalone: true,
  imports: [ClickTrackerDirective],
  template: `
    <div>
      <p>about works!</p>
      <div>
        <input type="radio" name="color" (click)="handleClick('yellow')" />
        Yellow
        <input type="radio" name="color" (click)="handleClick('red')" /> Red
        <input type="radio" name="color" (click)="handleClick('blue')" /> Blue
      </div>
      <p [style.color]="color">{{ color }}</p>
      <p [clickTrackerDirective]="color">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptate
        aliquam aperiam! Saepe atque laborum quisquam perferendis, eius fugit,
        doloribus incidunt laudantium neque maiores enim odit. Natus
        necessitatibus laboriosam quibusdam.
      </p>
    </div>
  `,
  styleUrls: ['./about.component.css'], // Note: use 'styleUrls' instead of 'styleUrl'
})
export class AboutComponent {
  color: string = '';

  handleClick(val: string) {
    this.color = val;
  }
}
