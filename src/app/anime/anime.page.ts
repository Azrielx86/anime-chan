import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnime } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {
  public anime: IAnime;
  public windowWidth = window.innerWidth;
  private animeId: string;
  private apiLoaded = false;

  constructor(
    private marikaService: MarikaService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    this.animeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.anime = await this.marikaService
      .getAnime(this.animeId)
      .then((result) => (this.anime = result))
      .catch();

    console.log(this.anime);
  }
}
