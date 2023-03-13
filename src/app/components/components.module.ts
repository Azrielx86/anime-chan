import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AnimeCarouselComponent } from './anime-carousel/anime-carousel.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [AnimeCardComponent, AnimeCarouselComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    SwiperModule
  ],
  exports: [AnimeCardComponent, AnimeCarouselComponent]
})
export class ComponentsModule { }
