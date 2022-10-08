import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnime } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {
  // public anime: AnimeModel = new AnimeModel();
  public anime: IAnime;
  private animeId: string;
  constructor(
    private marikaService: MarikaService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.animeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.anime = await this.marikaService
      .getAnime(this.animeId)
      .then((result) => (this.anime = result))
      .catch();

    console.log(this.anime);
  }
}
