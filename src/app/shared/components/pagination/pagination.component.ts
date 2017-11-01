import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  page_1 = 1;
  page_current: number;
  page_last: number;
  tr_per_page = 10;
  @Input() transactions_all = [];
  // @Output() transactions_current = new EventEmitter<any>();
  @Output() transactions_current: EventEmitter<any> = new EventEmitter(true);

  constructor() { }

  ngOnInit() {
    this.setStartPages();
  }

  public setStartPages() {
    const pages = Math.ceil(this.transactions_all.length / this.tr_per_page);
    console.log(this.transactions_all.length);
    this.page_current = 1;
    this.page_last = pages;
    this.transactions_current.emit(Observable.from(this.transactions_all.slice(0, this.tr_per_page)));
    console.log(this.transactions_all.slice(0, this.tr_per_page).length);
  //  window.document.getElementById('page_1').classList.add('page_active');
  }


  public nextPageFunction() {

  }
}
