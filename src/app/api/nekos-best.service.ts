import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

declare var cordova: any;

@Injectable({
  providedIn: 'root',
})
export class NekosBestService {
  private url = 'https://nekos.best/api/v2/neko';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private nativeHTTP: HTTP,
    private file: File
  ) {
    this.createDataDirectory();
  }

  public async getRandom(category): Promise<NekosResponse> {
    return await fetch(this.url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  public async saveImage(imgUrl: string) {
    try {
      const filePath =
        this.file.externalRootDirectory +
        'DCIM/nekos/' +
        imgUrl.match(/\w+\.\w+$/g)[0];
      console.log(filePath);
      this.nativeHTTP
        .downloadFile(imgUrl, {}, {}, filePath)
        .then(async (response) => {
          cordova.plugins.MediaScannerPlugin.scanFile(filePath);

          const toast = await this.toastController.create({
            message: 'Image downloaded',
            position: 'bottom',
            duration: 1500,
          });
          await toast.present();
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error,
        buttons: ['Close'],
      });

      await alert.present();
    }
  }

  private createDataDirectory(): void {
    try {
      this.file
        .createDir(this.file.externalRootDirectory, 'DCIM/nekos', false)
        .then(() => {
          console.log('Directory created');
        })
        .catch((err) => {
          console.log('Error while creating directory.');
          console.error(err);
        });
    } catch (error) {}
  }
}

type NekosResponse = {
  results: {
    artist_href?: string;
    artist_name?: string;
    source_url?: string;
    anime_name?: string;
    url: string;
  }[];
};
