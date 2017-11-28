import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

    config: SwiperOptions = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30
    };

  ngOnInit() {
  }

}
