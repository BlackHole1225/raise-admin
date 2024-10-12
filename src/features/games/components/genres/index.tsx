"use client";

import useSWR from "swr";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { GenresContent } from "@/features/games/components/genres/index.content";
import { GenreModel } from "@/features/games/types/games";
import { Layout } from "@/features/layout/components";

export const Genres = () => {
  const { data: genresData, error } = useSWR<
    BaseResponse<GenreModel[], PaginationMetaModel>
  >(`/games/genres`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!genresData) return <div>Loading...</div>;

  return (
    <>
      <GenresContent data={genresData.data} />
    </>
  );
};
