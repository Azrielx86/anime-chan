import { Component, OnInit } from '@angular/core';
import { IAnime, ITopAnime } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public topAnime: ITopAnime;
  public animeList: IAnime[];
  public page = 1;

  constructor(private marikaService: MarikaService) { }

  async ngOnInit() {
    this.topAnime = await this.marikaService.getTopAnime();
    this.animeList = this.topAnime.data;
  }
}
