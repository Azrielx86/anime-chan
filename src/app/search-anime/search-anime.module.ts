import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchAnimePageRoutingModule } from './search-anime-routing.module';

import { SearchAnimePage } from './search-anime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchAnimePageRoutingModule
  ],
  declarations: [SearchAnimePage]
})
export class SearchAnimePageModule {}
