import { CategoryModel, GenreModel } from "@/features/campaigns/types/games";

export interface BaseResponse<D = undefined, M = undefined> {
  status: number;
  message: string;
  forceLogout: boolean;
  data: D;
  meta: M;
  error?: string;
  exception?: object;
}

export interface PaginationMetaModel {
  pagination: PaginationModel;
}

export interface PaginationModel {
  count: number;
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface GameMetadataModel {
  name: string;
  version: string;
}

export interface GameDataModel {
  metadata: GameMetadataModel;
  name: string;
}

export interface ResGameDataModel {
  game_uuid: string;
  game_name: string;
  game_description: string;
  game_image: string;
  game_apk: string;
  game_categories: CategoryModel[];
  game_genres: GenreModel[];
  game_updated_at: string;
}
export interface ResKycDataModel {
  file: string;
  verify: string;
}
export interface ResCampaignDataModel {
  _id: string;
  name: string;
  description: string;
  image: string;
  updated_at: string;
}
