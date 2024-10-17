import {
  CategoryModel,
  CategoryParam,
  CampaignModel,
  LocationModel,
  QueryParam,
} from "@/features/games/types/games";
import { client } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel,  ResKycDataModel } from "@/types/base";

export const getGames = async (
  data: QueryParam = {
    page: 1,
    per_page: 10,
  }
): Promise<{ data: BaseResponse<CampaignModel[], PaginationMetaModel> }> => {
  const response = await client.get<
    BaseResponse<CampaignModel[], PaginationMetaModel>
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
