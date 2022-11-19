import { Injectable, Type } from '@angular/core';
import { Client, NB_CATEGORIES, NB_RESPONSE } from 'nekos-best.js';

@Injectable({
  providedIn: 'root',
})
export class NekosBestService {
  private client = new Client();

  constructor() {
    this.client.init();
  }

  public async getRandom(category: NB_CATEGORIES): Promise<NB_RESPONSE> {
    return await this.client.fetchRandom(category);
  }
}
