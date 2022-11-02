import { Component, OnInit } from '@angular/core';
import { IAnime, ITopAnime, ITopManga } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public topAnime: ITopAnime;
  public topManga: ITopManga;
  public animeList: IAnime[];
  public page = 1;

  constructor(private marikaService: MarikaService) { }

  async ngOnInit() {
    // this.topAnime = await this.marikaService.getTopAnime();
    this.topManga = await this.marikaService.getTopManga();
    this.animeList = await (await this.marikaService.getTopAnime()).data;
  }
}
