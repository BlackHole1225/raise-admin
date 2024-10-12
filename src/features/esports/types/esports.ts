export type CreateEsportsGameModel = {
  name: string;
  description: string;
  timer: string;
  image: File;
  categories: string[];
  bets: string[];
  // genres: string[];
  is_age_limit: boolean;
};

export interface BetsModel {
  bet_uuid: string;
  bet_value: number;
}

export interface EsportsGameModel {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
  is_active: boolean;
  categories: string[];
  bets: BetsModel[];
  created_at: Date;
}

export type CreateBetsModel = {
  bet_value: number;
};

export interface UpdateEsportsGameModel {
  name: string;
  description: string;
  categories: string[];
  bets: string[];
  image: File;
}
