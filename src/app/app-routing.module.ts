import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    //! Cambiar
    path: '',
    // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    // redirectTo: '/anime/32380',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'anime/:id',
    loadChildren: () =>
      import('./anime/anime.module').then((m) => m.AnimePageModule),
  },
  {
    path: 'search/:type',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'manga/:id',
    loadChildren: () =>
      import('./manga/manga.module').then((m) => m.MangaPageModule),
  },
  {
    path: 'nekos',
    loadChildren: () => import('./nekos/nekos.module').then( m => m.NekosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
