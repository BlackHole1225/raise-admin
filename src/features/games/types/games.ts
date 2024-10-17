export interface QueryParam {
  page?: number;
  per_page?: number;
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



export interface CategoryModel {
  category_uuid: string;
  category_name: string;
}

export interface GenreModel {
  genre_uuid: string;
  genre_name: string;
}



export interface LocationModel {
  _id: string;
  name: string;
}
