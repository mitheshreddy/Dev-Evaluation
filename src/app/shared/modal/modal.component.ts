import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isOpen = false;
  @HostListener('window:click', ['$event'])
  onWindowClick($event) {
    const target = $event.target.className;
    if (target === 'overlay-bg') {
      this.isOpen = false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  public close() {
    this.isOpen = false;
  }

  public open() {
    this.isOpen = true;
  }

}
