import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[clickTrackerDirective]',
  standalone: true,
})
export class ClickTrackerDirective {
  @Input('clickTrackerDirective') color!: string;

  constructor(private ele: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.ele.nativeElement.style.color = this.color;
  }

  @HostListener('mouseleave') onMouseMove() {
    this.ele.nativeElement.style.color = '';
  }
}
