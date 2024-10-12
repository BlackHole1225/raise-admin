import {
  BetsModel,
  CreateEsportsGameModel,
  EsportsGameModel,
  UpdateEsportsGameModel,
} from "@/features/esports/types/esports";
import { client } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { CreateBetsModel } from "@/features/esports/types/esports";

export const createEsports = async (
  data: CreateEsportsGameModel
): Promise<{ data: BaseResponse<EsportsGameModel> }> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("image", data.image as File, data.image.name);

  data.categories.forEach((category) => {
    formData.append("categories[]", category);
  });

  data.bets.forEach((bet) => {
    formData.append("bets[]", bet);
  });

  formData.append("is_age_limit", data.is_age_limit ? "1" : "0");

  const response = await client.post<BaseResponse<EsportsGameModel>>(
    `/esports/game`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return { data: response.data };
};

export const updateEsports = async (
  id: number,
  payload: UpdateEsportsGameModel
): Promise<{ data: BaseResponse<EsportsGameModel> }> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("image", payload.image, payload.image.name);

  payload.categories.forEach((genre) => {
    formData.append("categories[]", genre);
  });

  payload.bets.forEach((bet) => {
    formData.append("bets[]", bet);
  });
  formData.append("_method", "PATCH");

  const response = await client.patch<BaseResponse<EsportsGameModel>>(
    `/esports/game/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return { data: response.data };
};

export const createBet = async (
  data: CreateBetsModel
): Promise<{ data: BaseResponse<BetsModel> }> => {
  const response = await client.post<BaseResponse<BetsModel>>(
    `/esports/bets`,
    data
  );
  return { data: response.data };
};
export const deleteBet = async (
  id: string
): Promise<{ data: BaseResponse<BetsModel> }> => {
  const response = await client.delete<BaseResponse<BetsModel>>(
    `/esports/bets/${id}`
  );
  return { data: response.data };
};

// loadImage(url: string): Observable < Blob > {
//     return this.http.get(url, {
//      responseType: "blob"
//     });
// }

export const loadImage = async (url: string): Promise<Blob> => {
  const response = await client.get<Blob>(url);

  return response.data;
};
