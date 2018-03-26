import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';

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
  }
}
