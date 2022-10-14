import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimePageRoutingModule } from './anime-routing.module';

import { AnimePage } from './anime.page';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimePageRoutingModule,
    YouTubePlayerModule,
    NgxEchartsModule.forChild()
  ],
  declarations: [AnimePage]
})
export class AnimePageModule {}
