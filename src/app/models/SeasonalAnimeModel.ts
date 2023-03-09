import { IAnime } from '@shineiichijo/marika';

export interface IAnimeSeasonNow {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
  data: IAnime[];
}

export interface IAnimeSeason {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      has_next_page: boolean;
    };
  };
  data: IAnime[];
}

export type TMethods =
  | 'anime'
  | 'manga'
  | 'characters'
  | 'random'
  | 'top'
  | 'seasons';

export type TSeasons = 'winter' | 'spring' | 'summer' | 'fall';
