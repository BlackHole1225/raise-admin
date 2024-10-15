"use client";

import {
  LoginModel,
  SignupCredentials,
  UserModel,
  TokenModel,
  ResetPasswordParam,
} from "@/features/auth/types";
import { BaseResponse } from "@/types/base";
import { client } from "@/libs/axios";

export const loginWithEmailAndPassword = async (
  data: LoginModel
): Promise<{ data: BaseResponse<UserModel, TokenModel> }> => {
  const response = await client.post<BaseResponse<UserModel, TokenModel>>(
    "/admin/login",
    {...data}
  );
  return { data: response.data };
};
export const resetPassWord = async (
  data: ResetPasswordParam
): Promise<{ data: BaseResponse<UserModel, TokenModel> }> => {
  const response = await client.post<BaseResponse<UserModel, TokenModel>>(
    "/user/authentication/forget-password",
    data
  );
  return { data: response.data };
};
