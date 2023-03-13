import { Component, Input, OnInit } from '@angular/core';
import { IAnime } from '@shineiichijo/marika';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.scss'],
})
export class AnimeCardComponent implements OnInit {
  @Input() anime: IAnime;
  constructor() {}

  ngOnInit() {
    
  }
}
