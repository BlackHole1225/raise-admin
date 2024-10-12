"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { GamesContent } from "@/features/games/components/index/index.content";
import { GameModel } from "../../types/games";
import { deleteGame } from "../../api/game";
import { useSnackbar } from "@/contexts/snackbarContext";
import { Layout } from "@/features/layout/components";

export const Games = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const showSnackbar = useSnackbar();

  const { data: gameData, error } = useSWR<
    BaseResponse<GameModel[], PaginationMetaModel>
  >(`/games?page=${page}&pagination[per_page]=${perPage}`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!gameData) return <div>Loading...</div>;

  const onDeleteGame = async (gameId: string) => {
    const res = await deleteGame(gameId);
    if(res.data.status) {
      showSnackbar({
        newMessage: "Game removed successfully.",
        newSeverity: "success",
      });
      window.location.reload();
    } else {
      showSnackbar({
        newMessage: "Game remove failed.",
        newSeverity: "error",
      });
    }
  };

  return (
    <>
      <GamesContent
        data={gameData.data}
        page={page}
        perPage={perPage}
        count={Math.ceil(gameData.meta.pagination.total / perPage)}
        onChangePagination={(page: number) => setPage(page)}
        onChangePerPage={(perPage: number) => setPerPage(perPage)}
        onDelete={onDeleteGame}
      />
    </>
  );
};
