"use client";
import useSWR from "swr";
import { EsportsBetsContent } from "@/features/esports/components/bets/index.content";
import { BetsModel } from "@/features/esports/types/esports";
import { Layout } from "@/features/layout/components";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";

export const EsportsBets = () => {
  const { data: betsData, error } = useSWR<
    BaseResponse<BetsModel[], PaginationMetaModel>
  >(`/esports/bets`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!betsData) return <div>Loading...</div>;

  return (
    <>
      <EsportsBetsContent data={betsData.data} />
    </>
  );
};
