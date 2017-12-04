import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-for-delete',
  templateUrl: './navbar-for-delete.component.html',
  styleUrls: ['./navbar-for-delete.component.scss']
})
export class NavbarForDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public clearLS() {
    localStorage.clear();
    console.log(localStorage);
  }

  public showLS() {
    console.log(localStorage);
  }

  public clearSS() {
    sessionStorage.clear();
    console.log(sessionStorage);
  }

  public showSS() {
    console.log(sessionStorage);
  }

}
