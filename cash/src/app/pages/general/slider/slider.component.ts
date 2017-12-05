import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30
  };

  @Output() showSlider = new EventEmitter<string>();

  constructor() { }


  ngOnInit() {
  }

  public setSliderVisibility() {
    sessionStorage.setItem('show-slider', '1');
    this.showSlider.emit('1');
   // this.contract_defined.emit(contract);
  }
}
