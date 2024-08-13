import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup__container" [ngClass]="{ show: isOpen, hide: !isOpen }">
      <div class="popup__content">
        <div class="">
          <img [src]="image" alt="" srcset="" />
        </div>
      </div>
      <div class="popup__close_btn">
        <button (click)="onClose()">x</button>
      </div>
    </div>
  `,
  styleUrls: ['./popup.components.css'],
})
export class PopupComponent implements OnInit {
  @Output() onClosePopup: EventEmitter<Function> = new EventEmitter();
  @Input() image: string = '';

  isOpen = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true;
    }, 300);
  }

  onClose() {
    this.isOpen = false;
    setTimeout(() => this.onClosePopup.emit(), 300);
  }
}
