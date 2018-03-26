import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';

declare var navigator: any;

@Component({
  selector: 'app-services-geolocalisation-agent',
  templateUrl: './geolocalisation-agent.component.html',
  styleUrls: ['./geolocalisation-agent.component.scss']
})
export class GeolocalisationAgentComponent implements OnInit, OnDestroy {
  userRole = '';
  alive = true;
  agentsMarkers: Array<MarkerClass>;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public setAgentsMarkersFunction(markers: Array<MarkerClass>) {
    this.agentsMarkers = markers;
    console.log(this.agentsMarkers);
  }

  public startGettingMyCoord() {
    console.log('startGettingMyCoord');

    // cordova.plugins.barcodeScanner.scan(
    //   (result) => {
    //     const s = 'Result: ' + result.text + '<br/>';
    //     console.log(result.text);
    //     setTimeout(this.showQRdata(result.text), 100);
    //   },
    //   function (error) {
    //     alert('Scanning failed: ' + error);
    //   }
    // );

    navigator.geolocation.getCurrentPosition((position) => {
        const element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />'; //  +
                            // '<hr />'      + element.innerHTML;


        // const s = 'Result: ' + position.text + '<br/>';
        console.log(position);
        // setTimeout(this.showQRdata(result.text), 100);
      },
      (error) => {
        alert('Scanning failed: ' + error);
      },
      []);
  }
}
