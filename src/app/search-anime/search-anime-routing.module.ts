import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchAnimePage } from './search-anime.page';

const routes: Routes = [
  {
    path: '',
    component: SearchAnimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchAnimePageRoutingModule {}
