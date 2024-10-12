"use client"
import useSWR from "swr";
import { BlockchainContent } from '@/features/Finace/components/Blockchain/index.content'
import { BlockchainModel } from "@/types/model/finance";

import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse } from "@/types/base";

export const Blockchain = () => {
  const { data:blockchainData, error } = useSWR<
    BaseResponse<BlockchainModel[]>
    >(`/finance/blockchain`, fetcherWithTotal);
  
    if (error) return <div>Error fetching data</div>;
    if (!blockchainData) return <div>Loading...</div>;

  return (
    <BlockchainContent data={ blockchainData.data} />
  )
}