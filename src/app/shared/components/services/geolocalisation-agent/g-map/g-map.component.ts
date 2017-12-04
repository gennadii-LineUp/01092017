import { Component, OnInit } from '@angular/core';

export class MarkerClass {
  latitude: number;
  longitude: number;
  title: string;
  iconUrl: string;

  constructor(latitude: number,
              longitude: number,
              title: string,
              iconUrl: string) {

    this.latitude = latitude;
    this.longitude = longitude;
    this.title = title;
    this.iconUrl = iconUrl;
  }
}


@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss']
})
export class GMapComponent implements OnInit {
  lat = 15.0458118;
  lng = -16.858833;
  draggable: true;
  zoom = 7;
  markers = [new MarkerClass(14.7955497, -15.6452902, 'AA', '../../../../../../assets/img/user.png'),
              new MarkerClass(14.9268314, -16.2581422, 'BB', '../../../../../../assets/img/logo.png')
  ];

  constructor() { }

  ngOnInit() {
  }

  public markerClicked(title: any) {
    console.log(title);
    console.dir(title);
  }
}
