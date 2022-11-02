import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  public statsChartOption: EChartsOption;
  public scoreChartOption: EChartsOption;
  public initOpts: any;
  private animeId: number;
  private apiLoaded = false;
  private synopsisExpanded = false;

  constructor(
    private marikaService: MarikaService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    try {
      this.animeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.anime = await this.marikaService.getAnime(this.animeId);
      this.stats = await this.marikaService.getAnimeStats(this.animeId);
      this.characters = await this.marikaService.getAnimeCharacters(
        this.animeId
      );
      // this.pictures = await this.marikaService.getAnimePictures(this.animeId);
      // this.episodes = await this.marikaService.getAnimeEpisodes(this.animeId);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error,
        buttons: ['Close'],
      });

      await alert.present();
    }

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
      this.initOpts = {
        renderer: 'svg',
      };

      this.statsChartOption = {
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

    this.scoreChartOption = {
      title: {
        text: 'Anime scores',
        subtext: 'Click for more info!',
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
        },
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.stats.scores.map((score) => score.votes),
        },
      ],
    };

    console.log(this.anime);
    console.log(this.characters);
    console.log(this.pictures);
    console.log(this.episodes);
    console.log(this.stats);
  }

  /**
   * TODO: Remove later or use to other action.
   * @param characterVA Character voice actor
   */
  showVoiceActors = async (characterVA) => {
    let names = characterVA.map((va) => `${va.person.name} (${va.language})`);

    const alert = await this.alertController.create({
      header: 'Voice Actors',
      message: `${names}`,
      buttons: ['Close'],
    });

    await alert.present();
  };

  expandSynopsis = async () => {
    document.getElementById('synopsis').style.maxHeight = this.synopsisExpanded
      ? '12.4rem'
      : '100%';
    this.synopsisExpanded = !this.synopsisExpanded;
  };
}
