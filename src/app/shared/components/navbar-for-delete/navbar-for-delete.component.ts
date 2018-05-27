import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-for-delete',
  templateUrl: './navbar-for-delete.component.html',
  styleUrls: ['./navbar-for-delete.component.scss']
})
export class NavbarForDeleteComponent {

  public clearLS() {
    localStorage.clear();
  }

  public showLS() {
  }

  public clearSS() {
    sessionStorage.clear();
  }

  public showSS() {
  }

}
