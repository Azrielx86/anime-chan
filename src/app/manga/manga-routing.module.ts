import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaPage } from './manga.page';

const routes: Routes = [
  {
    path: '',
    component: MangaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaPageRoutingModule {}
