import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IAnime,
  IAnimeCharacters,
  IAnimeEpisodes,
  IAnimeFull,
  IAnimePictures,
  IAnimeStats,
} from '@shineiichijo/marika';
import { EChartsOption } from 'echarts';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {
  public anime: IAnimeFull;
  public characters: IAnimeCharacters;
  public pictures: IAnimePictures;
  public stats: IAnimeStats;
  public episodes: IAnimeEpisodes;
  public windowWidth = window.innerWidth;
  public chartOption: EChartsOption;
  private animeId: number;
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

    this.animeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.anime = await this.marikaService.getAnime(this.animeId);
    this.characters = await this.marikaService.getAnimeCharacters(this.animeId);
    this.pictures = await this.marikaService.getAnimePictures(this.animeId);
    this.stats = await this.marikaService.getAnimeStats(this.animeId);
    this.episodes = await this.marikaService.getAnimeEpisodes(this.animeId);

    const xData = [
      { value: this.stats.completed, name: 'Completed' },
      { value: this.stats.watching, name: 'Watching' },
      { value: this.stats.on_hold, name: 'On Hold' },
      { value: this.stats.dropped, name: 'Dropped' },
      { value: this.stats.plan_to_watch, name: 'Plan to Watch' },
    ];

    const yData = [
      'Completed',
      'Watching',
      'On Hold',
      'Dropped',
      'Plan to Watch',
    ];

    if (this.stats !== undefined) {
      this.chartOption = {
        title: {
          text: 'Anime stats',
          subtext: 'Click for more info!',
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        legend: {
          align: 'auto',
          bottom: 0,
          data: yData,
          textStyle: {
            color: '#ffffff',
          },
        },
        calculable: true,
        series: [
          {
            type: 'pie',
            label: {
              show: false,
            },
            data: xData,
          },
        ],
      };
    }

    console.log(this.anime);
    console.log(this.characters);
    console.log(this.pictures);
    console.log(this.episodes);
    console.log(this.stats);
  }
}
