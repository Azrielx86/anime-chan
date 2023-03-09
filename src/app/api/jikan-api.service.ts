import { Injectable } from '@angular/core';
import { IAnimeSeasonNow } from '../models/SeasonalAnimeModel';

@Injectable({
  providedIn: 'root',
})
export class JikanAPIService {
  private baseUrl = "https://api.jikan.moe/v4/";
  constructor() {}

  public async getAiringAnime(): Promise<IAnimeSeasonNow> {
    return await fetch(`${this.baseUrl}seasons/now`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }
}
