/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NekosBestService } from '../api/nekos-best.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nekos',
  templateUrl: './nekos.page.html',
  styleUrls: ['./nekos.page.scss'],
})
export class NekosPage implements OnInit {
  public currentImage: NB_RESULT;

  constructor(
    private nekosService: NekosBestService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.reloadImage();
  }

  public async reloadImage() {
    this.currentImage = (await this.nekosService.getRandom('neko')).results[0];
  }

  public async saveImage() {
    try {
      const content = await this.fetchTimeout(this.currentImage.url);
      const blob = await content.blob();
      const base64Data = (await this.convertBlobToBase64(blob)) as string;
      const savedFile = await Filesystem.writeFile({
        path: this.currentImage.url.match(/\w+\.\w+$/g)[0],
        data: base64Data,
        directory: Directory.Documents,
      });

      const toast = await this.toastController.create({
        message: 'Image downloaded',
        position: 'top',
        duration: 1500,
      });

      await toast.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error,
        buttons: ['Close'],
      });

      await alert.present();
    }
  }

  public convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = reject;
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.readAsDataURL(blob);
    });
  }

  private async fetchTimeout(url: string) {
    const timeout = 8000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(id);

    return response;
  }
}

export interface NB_RESULT {
  artist_href?: string;
  artist_name?: string;
  source_url?: string;
  anime_name?: string;
  url: string;
}
