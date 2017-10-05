import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-retrait-code',
  templateUrl: './retrait-code.component.html',
  styleUrls: ['./retrait-code.component.scss']
})
export class RetraitCodeComponent implements OnInit {
  retraitCode_valid = false;
  retraitCode_errorMessage = false;
  amount_retraitCode: number;
  constructor() { }

  ngOnInit() {
  }

  public submitFunction() {
    this.retraitCode_valid = !this.retraitCode_valid;
    console.log(this.amount_retraitCode);
  }

}
