import { Injectable } from '@angular/core';
import { Anime, Character, IAnime, Manga } from '@shineiichijo/marika';

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

  public async getAnime(id: string): Promise<IAnime> {
    return await this.animeClient.getAnimeById(Number(id));
  }
}
