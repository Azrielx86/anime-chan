import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IManga,
  IMangaCharacters,
  IMangaPictures,
  IMangaStats,
} from '@shineiichijo/marika';
import { EChartsOption } from 'echarts';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.page.html',
  styleUrls: ['./manga.page.scss'],
})
export class MangaPage implements OnInit {
  public manga: IManga;
  public characters: IMangaCharacters;
  public pictures: IMangaPictures;
  public stats: IMangaStats;
  public statsChartOption: EChartsOption;
  public scoreChartOption: EChartsOption;
  public initOpts: any;
  private mangaId: number;
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
      this.mangaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.manga = await this.marikaService.getManga(this.mangaId);
      this.stats = await this.marikaService.getMangaStats(this.mangaId);
      // ! Waiting for Marika fix
      // this.characters = await this.marikaService.getMangaCharacters(
      //   this.mangaId
      // );
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
      { value: this.stats.reading, name: 'Reading' },
      { value: this.stats.on_hold, name: 'On Hold' },
      { value: this.stats.dropped, name: 'Dropped' },
      { value: this.stats.plan_to_read, name: 'Plan to Read' },
    ];

    const yData = [
      'Completed',
      'Reading',
      'On Hold',
      'Dropped',
      'Plan to Read',
    ];

    if (this.stats !== undefined) {
      this.initOpts = {
        renderer: 'svg',
      };

      this.statsChartOption = {
        title: {
          text: 'Manga stats',
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
        text: 'Manga scores',
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

    console.log(this.manga);
    console.log(this.characters);
    console.log(this.pictures);
    console.log(this.stats);
  }

  expandSynopsis = async () => {
    document.getElementById('synopsis').style.maxHeight = this.synopsisExpanded
      ? '12.4rem'
      : '100%';
    this.synopsisExpanded = !this.synopsisExpanded;
  };
}
