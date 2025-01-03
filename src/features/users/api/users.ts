import { QueryParam } from "@/features/users/types";
import {  UserModel } from "@/features/auth/types";
import { client } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";

export const getUsers = async (
  data: QueryParam = {
    name: "",
    page: 1,
    per_page: 10,
    search: null,
  }
): Promise<{ data: BaseResponse<UserModel[], PaginationMetaModel> }> => {
  const response = await client.get<
    BaseResponse<UserModel[], PaginationMetaModel>
  >(`/users`, { params: data });
  return { data: response.data };
};

export const removeUser = async (
  id: number
): Promise<{ data: BaseResponse }> => {
  const response = client.delete(`/users/${id}`);
  return response;
}

export const updateUserActivateStatus = async(
  id: number, 
  activate: boolean
): Promise<{ data: BaseResponse<UserModel> }> => {
  const response = client.patch(`/users/${id}/activate`, { is_actived: activate });
  return response;
}