import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PollsService } from '../polls.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  filteredList: any[];
  hasError: any;
  tempList: any[];
  searchTimeout: any;
  delay = 10000;
  poll: any;
  pollTimer: any;

  constructor(private pollsService: PollsService) { }
  public pollsList: any;
  @ViewChild('search', {static: true}) searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('modal', {static: true}) modalDialog;
  public debounce = this.OnKeyUpHandler(this.OnKeyUp, 500);




  ngOnInit() {
    this.pollsService.getPollsList().subscribe((data: any) => {
      this.pollsList = data.hits;
      this.filteredList = [...this.pollsList];
    }, (err) => {
      this.hasError = err;
      console.log(err);      
    })
  } 

  ngDoCheck() {
    clearTimeout(this.pollTimer);
    if (!this.hasError) {
      this.pollTimer = setTimeout(() => {
        let isPollModalOpen = this.modalDialog.isOpen;
        if (isPollModalOpen) isPollModalOpen = false;

        this.pollsService.getPollsList().subscribe((data: any) => {
          this.pollsList = data.hits;
          this.filteredList = [...this.pollsList];
        })
      }, this.delay)
    }
  }

  OnKeyUp() {
    const query = this.searchInput.nativeElement.value.toLowerCase().trim();
    if (query) {
      this.tempList = this.filteredList.filter((poll) =>poll.title.toLowerCase().indexOf(query) > -1);
      this.pollsList = this.tempList;
    }
    else {
      this.pollsList = this.filteredList;
    }
  }

  OnKeyUpHandler(fn , d) {
    return () => {
      clearTimeout(this.searchTimeout);
      const context = this;
      this.searchTimeout = setTimeout(() => {
        fn.call(context);
      }, d);
      
    }
  }

  openModal(poll) {
    this.poll = poll;
    this.modalDialog.isOpen = true;
    
  }

  getPoll(poll) {
    return JSON.stringify(poll);
  }

}
