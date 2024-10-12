"use client";
import { fetcher, fetcherWithTotal } from "@/libs/axios";
import useSWR from "swr";
import { User, UserModel } from "@/features/auth/types";
import { BaseResponse, PaginationMetaModel } from "@/types/base";

type UserProfileComponentProps = {
  id: number;
};
const UserProfileComponent = ({ id }: UserProfileComponentProps) => {
  const apiUrl = `/users/${id}`;
  // const { data: userProfileData, error } = useSWR<User>(id ? apiUrl : null);

  const { data: userProfileData, error } = useSWR<BaseResponse<UserModel>>(
    apiUrl,
    fetcher
  );

  if (error) return;
  if (!userProfileData) return;
  return (
    <>
      <div>{userProfileData.data.name}</div>
    </>
  );
};

export default UserProfileComponent;
