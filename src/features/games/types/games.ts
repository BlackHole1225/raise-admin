export interface QueryParam {
  page?: number;
  per_page?: number;
}

export interface GameModel {
  game_uuid: string;
  game_name: string;
  game_description: string;
  game_image: string;
  game_apk: string;
  game_genres: GenreModel[];
  game_categories: CategoryModel[];
}

export interface CampaignModel {
  campaign_uuid: string;
  title: string;
  content: string;
  countryId: string;
  categoryId: string;
  createrId: string;
  file: string;
  campaign_categories: CategoryModel[];
  delete: boolean;
}
export interface GenreModel {
  genre_uuid: string;
  genre_name: string;
}

export interface CategoryModel {
  category_uuid: string;
  category_name: string;
}

export type CategoryParam = {
  name: string;
};

export interface ResGameDataModel {
  genre_uuid: string;
  genre_name: string;
}

export interface GenreParam {
  name: string;
}

export interface CreateGameModel {
  name: string;
  description: string;
  version: string;
  source: string;
  cover: File;
  genres: string[] | any;
  categories: string[] | any;
}


export interface CategoryModel {
  category_uuid: string;
  category_name: string;
}

export interface GenreModel {
  genre_uuid: string;
  genre_name: string;
}

export interface UpdateGameModel {
  name: string;
  description: string;
}

export interface LocationModel {
  _id: string;
  name: string;
}
