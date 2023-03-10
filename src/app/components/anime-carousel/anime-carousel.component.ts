import { Component, Input, OnInit } from '@angular/core';
import { IAnime } from '@shineiichijo/marika';

@Component({
  selector: 'app-anime-carousel',
  templateUrl: './anime-carousel.component.html',
  styleUrls: ['./anime-carousel.component.scss'],
})
export class AnimeCarouselComponent implements OnInit {
  @Input() animeList: IAnime[]
  constructor() { }

  ngOnInit() {}

}
