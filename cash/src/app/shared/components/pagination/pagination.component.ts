import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pages: number;
  page_1 = 1;
  page_current: number;
  page_last: number;
  tr_per_page = 10;
  start = 0;
  end = this.start + this.tr_per_page;

  @Input() transactions_all = [];
  // @Output() transactions_current = new EventEmitter<any>();
  @Output() transactions_current: EventEmitter<any> = new EventEmitter(true);

  next_step_pages: number;
  prev_step_pages: number;


  constructor() { }

  ngOnInit() {
    this.setStartPages();
  }

  public setStartPages() {
    this.pages = Math.ceil(this.transactions_all.length / this.tr_per_page);
    console.log(this.transactions_all.length);
    this.page_last = this.pages;
    console.log(this.transactions_all.slice(this.start, this.end).length);
    this.firstButtonFunction();
  //  window.document.getElementById('page_last').classList.add('page_active');
  }

  public sendCurrentTransactions(start, end) {
    console.log(start + '-' + (end - 1));
    this.transactions_current.emit(Observable.from(this.transactions_all.slice(start, end)));
    this.next_step_pages = this.transactions_all.length - this.page_current * this.tr_per_page;
    this.prev_step_pages = this.page_current * this.tr_per_page - this.tr_per_page;
  }

  public previousButtonFunction() {
    this.page_current = Math.max(1, this.page_current - 1);
    console.log('previous ' + this.page_current);
    this.sendCurrentTransactions((this.page_current - 1) * this.tr_per_page, (this.page_current) * this.tr_per_page);
  }

  public firstButtonFunction() {
    this.page_current = 1;
    console.log(this.page_current);
    this.sendCurrentTransactions(0, this.tr_per_page);
    this.clearAllPageActiveFunction();
    window.document.getElementById('page_1').classList.add('page_active');
  }

  public currentButtonFunction() {

  }

  public lastButtonFunction() {
    this.page_current = this.pages;
    const last_pages = this.transactions_all.length - ((this.page_current - 1) * this.tr_per_page);
    console.log(this.page_current);
    this.sendCurrentTransactions((this.page_current - 1) * this.tr_per_page, (this.page_current - 1) * this.tr_per_page + last_pages + 1);
    this.clearAllPageActiveFunction();
    window.document.getElementById('page_last').classList.add('page_active');
  }

  public nextButtonFunction() {
    this.page_current = Math.min(this.pages, this.page_current + 1);
    console.log('next ' + this.page_current);
    this.sendCurrentTransactions(this.page_current * this.tr_per_page - this.tr_per_page, this.page_current * this.tr_per_page);
  }

  public clearAllPageActiveFunction() {
    const pagination_items: NodeListOf<Element> = window.document.querySelectorAll('div.pagination_item');
    for (let i = 0; i < pagination_items.length; i++) {
      pagination_items[i].className = 'pagination_item';
    }
  }

}
