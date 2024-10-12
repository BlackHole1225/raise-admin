"use client";

import { DistributeModel } from "../types";
import { BaseResponse } from "@/types/base";
import { client } from "@/libs/axios";
import { RoomModel } from "@/features/auth/types";

export const distributeBalance = async (
  data: DistributeModel
): Promise<{ data: RoomModel[] }> => {
  console.log(data);
  
  const response = await client.post<BaseResponse<RoomModel[]>>(
    `/reports/esports/distribute`,
    data
  );
  return response.data;
};
