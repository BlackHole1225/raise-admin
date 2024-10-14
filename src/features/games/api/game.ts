import {
  CategoryModel,
  CategoryParam,
  CreateGameModel,
  UpdateGameModel,
  GameModel,
  LocationModel,
  GenreModel,
  GenreParam,
  QueryParam,
} from "@/features/games/types/games";
import { client } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel, GameDataModel, ResGameDataModel, ResKycDataModel } from "@/types/base";

export const getGames = async (
  data: QueryParam = {
    page: 1,
    per_page: 10,
  }
): Promise<{ data: BaseResponse<GameModel[], PaginationMetaModel> }> => {
  const response = await client.get<
    BaseResponse<GameModel[], PaginationMetaModel>
  >(`/campaign`, { params: data });
  return { data: response.data };
};

export const createCategory = async (
  data: CategoryParam
): Promise<{ data: BaseResponse<CategoryModel> }> => {
  const response = await client.post<BaseResponse<CategoryModel>>(
    `/category/create`,
    data
  );
  return { data: response.data };
};

export const deleteCategory = async (
  id: string
): Promise<{ data: BaseResponse<CategoryModel> }> => {
  const response = await client.delete<BaseResponse<CategoryModel>>(
    `/category/delete`,
    {
      data: {
        categoryId: id
      }
    }
  );
  return { data: response.data };
};

export const createGenre = async (
  data: GenreParam
): Promise<{ data: BaseResponse<GenreModel> }> => {
  const response = await client.post<BaseResponse<GenreModel>>(
    `/games/genres`,
    data
  );
  return { data: response.data };
};

export const deleteGenre = async (
  id: string
): Promise<{ data: BaseResponse<GenreModel> }> => {
  const response = await client.delete<BaseResponse<GenreModel>>(
    `/games/genres/${id}`
  );
  return { data: response.data };
};

export const uploadGameFile = async (
  data: FormData
): Promise<{ data: BaseResponse<GameDataModel>}> => {
  const response = await client.post<BaseResponse<GameDataModel>>(
    `/games/file`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return { data: response.data };
}

export const createGame = async(
  gameData: CreateGameModel
): Promise<{data: BaseResponse<ResGameDataModel>}> => {
  const formData = new FormData()
  formData.append("name", gameData.name);
  formData.append("description", gameData.description);
  formData.append("version", gameData.version);
  formData.append("source", gameData.source);
  formData.append("cover", gameData.cover);

  gameData.genres.forEach((genre: any) => {
    formData.append("genres[]", genre)
  });

  gameData.categories.forEach((category: any) => {
    formData.append("categories[]", category)
  })

  const response = await client.post(
    `/games`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return { data: response.data };
}

export const updateGame = async (
  gameId: string,
  gameData: UpdateGameModel,
): Promise<{data: BaseResponse<ResGameDataModel>}> => {
  const response = await client.patch(
    `/games/${gameId}`,
    gameData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return { data: response.data };
}
export const checkKycApi = async (
  id: string,
  state: string,
  file: string
): Promise<{data: BaseResponse<ResKycDataModel>}> => {
  const response = await client.post(
    `/campaign/kyc/${id}`,
    {state: state, file: file}
  );
  return { data: response.data };
}
export const deleteGame = async (
  gameId: string
): Promise<{ data: BaseResponse }> => {
  const response = await client.post(`/campaign/delete`,{
    campaignId:gameId
  });
  return { data: response.data };
}

export const deleteLocation = async (
  locationId: string
): Promise<{ data: BaseResponse }> => {
  const response = await client.post(`/location/delete`,{
    locationId:locationId
  });
  return { data: response.data };
}

export const createLocation = async (
  locationData: LocationModel
): Promise<{data: BaseResponse<LocationModel>}> => {
  const response = await client.post(`/location/create`, locationData);
  return { data: response.data };
}
