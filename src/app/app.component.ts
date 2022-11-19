import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  apiLoaded = false;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Anime', url: '/search/anime', icon: 'albums' },
    { title: 'Manga', url: '/search/manga', icon: 'book' },
    { title: 'Characters', url: '/characters', icon: 'people' },
    { title: 'Neko :3', url: '/nekos', icon: 'add' },
  ];
  constructor() {}

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
