"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { EsportsGamesContent } from "@/features/esports/components/index/index.content";
import { EsportsGameModel } from "@/features/esports/types/esports";
import { Layout } from "@/features/layout/components";

export const EsportsGames = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const { data: gameData, error } = useSWR<
    BaseResponse<EsportsGameModel[], PaginationMetaModel>
  >(
    `/esports/games?page=${page}&pagination[per_page]=${perPage}&pagination[is_paginated]=1`,
    fetcherWithTotal
  );

  if (error) return <div>Error fetching data</div>;
  if (!gameData) return <div>Loading...</div>;

  return (
    <>
      <EsportsGamesContent
        data={gameData.data}
        page={page}
        perPage={perPage}
        count={Math.ceil(gameData.meta.pagination.total / perPage)}
        onChangePagination={(page: number) => setPage(page)}
        onChangePerPage={(perPage: number) => setPerPage(perPage)}
      />
    </>
  );
};
