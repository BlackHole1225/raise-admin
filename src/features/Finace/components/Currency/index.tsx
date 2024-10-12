"use client";
import useSWR from "swr";
import { CurrencyContent } from "@/features/Finace/components/Currency/index.content";

import { CurrencyModel } from "@/types/model/finance";

import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse} from "@/types/base";

export const Currency = () => {
  const { data:currencyData, error } = useSWR<
    BaseResponse<CurrencyModel[]>
    >(`/finance/currency`, fetcherWithTotal);
  if (error) return <div>Error fetching data</div>;
  if (!currencyData) return <div>Loading...</div>;

  return (
      <CurrencyContent data={currencyData.data} />
  )
}