import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnime, ICharacter, IManga } from '@shineiichijo/marika';
import { MarikaService } from '../api/marika.service';
import { TSearch } from '../typings/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public searchType: TSearch;
  public searchResults = [];

  constructor(
    private marikaService: MarikaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.searchType = this.activatedRoute.snapshot.paramMap.get(
      'type'
    ) as TSearch;

    console.log(this.searchType);
  }

  ngOnInit() {}

  public async onSearchChange(event) {
    const query = event.target.value.toLowerCase();
    if (query === '') {
      this.searchResults = [];
      return;
    }

    if (this.searchType === 'anime') {
      this.searchResults = await this.marikaService.searchAnime(query);
    } else if (this.searchType === 'manga') {
      console.log('Searching');
      this.searchResults = await this.marikaService.searchManga(query);
      console.log(this.searchResults);
    }
  }

  public goToResult(resultId: number) {
    if (this.searchType === 'anime') {
      this.router.navigate(['anime', { id: resultId }]);
    } else if (this.searchType === 'manga') {
      this.router.navigate(['manga', { id: resultId }]);
    }
  }
}
