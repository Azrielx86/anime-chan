import { Injectable } from '@angular/core';
import {
  Anime,
  Character,
  IAnime,
  IAnimeCharacters,
  IAnimeEpisodes,
  IAnimeFull,
  IAnimePictures,
  IAnimeStats,
  Manga,
} from '@shineiichijo/marika';

@Injectable({
  providedIn: 'root',
})
export class MarikaService {
  animeClient = new Anime();
  characterClient = new Character();
  mangaClient = new Manga();

  constructor() {}

  public async searchAnime(query: string): Promise<IAnime[]> {
    const animeList = await this.animeClient
      .searchAnime(query)
      .then((result) => result.data)
      .catch();
    console.log(animeList);

    return animeList;
  }

  public async getAnime(id: number): Promise<IAnimeFull> {
    return await this.animeClient.getAnimeFullById(id);
  }

  public async getAnimeCharacters(id: number): Promise<IAnimeCharacters> {
    return await this.animeClient.getAnimeCharacters(id);
  }

  public async getAnimeStats(id: number): Promise<IAnimeStats> {
    return await this.animeClient.getAnimeStats(id);
  }

  public async getAnimeEpisodes(id: number): Promise<IAnimeEpisodes> {
    return await this.animeClient.getAnimeEpisodes(id);
  }

  public async getAnimePictures(id: number): Promise<IAnimePictures> {
    return await this.animeClient.getAnimePictures(id);
  }
}
