import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NekosPage } from './nekos.page';

const routes: Routes = [
  {
    path: '',
    component: NekosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NekosPageRoutingModule {}
