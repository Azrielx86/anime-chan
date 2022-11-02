import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AnimePage } from './anime/anime.page';

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
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'anime/:id',
    loadChildren: () => import('./anime/anime.module').then( m => m.AnimePageModule)
  },
  {
    path: 'search-anime',
    loadChildren: () => import('./search-anime/search-anime.module').then( m => m.SearchAnimePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
