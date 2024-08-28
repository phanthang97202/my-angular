import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[clickTrackerDirective]',
  standalone: true,
})
export class ClickTrackerDirective {
  // Cách 1:
  @Input() color!: string; // => sử dụng: <p clickTrackerDirective [color]="color">
  @Input() eleValue!: HTMLParagraphElement;

  // Cách 2:
  // @Input('clickTrackerDirective') color!: string; // => sử dụng: <p [clickTrackerDirective]="color">

  constructor(private ele: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.ele.nativeElement.style.color = this.color;
    this.eleValue.style.color = this.color;
    console.log('eleValue', this.eleValue);
  }

  @HostListener('mouseleave') onMouseMove() {
    this.ele.nativeElement.style.color = '';
  }
}
