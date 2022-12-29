/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NekosBestService } from '../api/nekos-best.service';

@Component({
  selector: 'app-nekos',
  templateUrl: './nekos.page.html',
  styleUrls: ['./nekos.page.scss'],
})
export class NekosPage implements OnInit {
  public currentImage: NB_RESULT;

  constructor(private nekosService: NekosBestService) {}

  async ngOnInit() {
    await this.reloadImage();
  }

  public async reloadImage() {
    this.currentImage = (await this.nekosService.getRandom('neko')).results[0];
  }

  public async saveImage() {
    this.nekosService.saveImage(this.currentImage.url);
    // this.nekosService.saveImage("https://nekos.best/api/v2/neko/0331.png");
  }
}

export interface NB_RESULT {
  artist_href?: string;
  artist_name?: string;
  source_url?: string;
  anime_name?: string;
  url: string;
}
