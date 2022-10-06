import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAnime } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.page.html',
  styleUrls: ['./search-anime.page.scss'],
})
export class SearchAnimePage implements OnInit {
  public searchResults: IAnime[] = [];

  constructor(private marikaService: MarikaService, private router: Router) {}

  ngOnInit() {}

  public async onSearchChange(event) {
    const query = event.target.value.toLowerCase();
    if (query === '') {
      this.searchResults = [];
      return;
    }
    this.searchResults = await this.marikaService.searchAnime(query);
  }

  public goToAnime(animeId: number) {
    this.router.navigate(['anime', { id: animeId }]);
    // this.router.navigateByUrl('/anime/id');
  }
}
