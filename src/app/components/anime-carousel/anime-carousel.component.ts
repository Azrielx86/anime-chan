import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IAnime } from '@shineiichijo/marika';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-anime-carousel',
  templateUrl: './anime-carousel.component.html',
  styleUrls: ['./anime-carousel.component.scss'],
})
export class AnimeCarouselComponent implements OnInit {
  @Input() animeList: IAnime[];
  constructor() {}

  swpConfig: SwiperOptions = {
    effect: 'cards',
    autoplay: true,
    centeredSlides: true,
    slidesPerView: 1.8,
    spaceBetween: 10,
    initialSlide: 3,
  };

  ngOnInit() {}
}
