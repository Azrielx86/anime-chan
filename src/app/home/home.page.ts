import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAnime, ITopAnime, ITopManga } from '@shineiichijo/marika';
import { JikanAPIService } from '../api/jikan-api.service';
import { MarikaService } from '../api/marika.service';
import { IAnimeSeasonNow } from '../models/SeasonalAnimeModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public topAnime: ITopAnime;
  public topManga: ITopManga;
  public animeList: IAnime[];
  public airingAnime: IAnimeSeasonNow;
  public page = 1;

  constructor(
    private marikaService: MarikaService,
    private jikanService: JikanAPIService,
    private router: Router
  ) {}

  async ngOnInit() {
    // this.topAnime = await this.marikaService.getTopAnime();
    this.topManga = await this.marikaService.getTopManga();
    this.animeList = await (await this.marikaService.getTopAnime()).data;
    this.airingAnime = await this.jikanService.getAiringAnime();

    console.log(this.airingAnime);
  }

  public gotoAnime(animeId: number) {
    this.router.navigate(['anime', { id: animeId }]);
  }
}
