import { client } from "@/libs/axios";
import { BaseResponse } from "@/types/base";
import { BlockchainModel, CurrencyModel, WithdrawStatus } from "@/types/model/finance";
import { BlockchainRequestParam, CurrencyRequestParam } from "@/types/requests/finance";

export const createCurrency = async (
  data: CurrencyRequestParam
): Promise<{ data: BaseResponse<CurrencyModel> }> => {
  const response = await client.post<BaseResponse<CurrencyModel>>(
    `/finance/currency`,
    data
  );
  return { data: response.data };
};

export const deleteCurrency = async (
  id: string
): Promise<{ data: BaseResponse<CurrencyModel> }> => {
  const response = await client.delete<BaseResponse<CurrencyModel>>(
    `/finance/currency/${id}`
  );
  return { data: response.data };
};

export const createBlockchain = async (
  data: BlockchainRequestParam
): Promise<{ data: BaseResponse<BlockchainModel> }> => {
  const response = await client.post<BaseResponse<BlockchainModel>>(
    `/finance/blockchain`,
    data
  );
  return { data: response.data };
};

export const deleteBlockchain = async (
  id: string
): Promise<{ data: BaseResponse<BlockchainModel> }> => {
  const response = await client.delete<BaseResponse<BlockchainModel>>(
    `/finance/blockchain/${id}`
  );
  return { data: response.data };
};

