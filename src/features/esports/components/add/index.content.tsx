"use client";
import useSWR from "swr";
import { BaseResponse } from "@/types/base";
import { BetsModel } from "@/features/esports/types/esports";
import { fetcherWithTotal, fetcher } from "@/libs/axios";

import { EsportsGameAddForm } from "@/features/esports/components/add/form";
export const EsportsGameAddContent = () => {
  const { data: categoryData, error: betsFetchError } = useSWR<
    BaseResponse<string[]>
  >(`/esports/categories`, fetcherWithTotal);
  const { data: genresData, error: genresFetchError } = useSWR<
    BaseResponse<string[]>
  >(`/games/genres`, fetcherWithTotal);

  const { data: betsData, error: cetegoriesFetchError } = useSWR<
    BaseResponse<BetsModel[]>
  >(`/esports/bets`, fetcherWithTotal);

  if (betsFetchError || cetegoriesFetchError || genresFetchError)
    return <div>Error fetching data</div>;

  if (!betsData || !categoryData || !genresData) return <div>Loading...</div>;
  return (
    <>
      <EsportsGameAddForm
        betsData={betsData.data}
        categoriesData={categoryData.data}
        genresData={genresData.data}
      />
    </>
  );
};
