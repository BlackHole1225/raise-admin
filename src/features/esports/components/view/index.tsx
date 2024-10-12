"use client";
import useSWR from "swr";
import { EsportsGameViewContent } from "@/features/esports/components/view/index.content";
import { BaseResponse } from "@/types/base";
import { BetsModel, EsportsGameModel } from "@/features/esports/types/esports";
import { fetcher } from "@/libs/axios";
import { CategoryModel } from "@/features/games/types/games";

type EsportsGamesViewProps = {
  gameId: number;
};
const EsportsGameView: React.FC<EsportsGamesViewProps> = ({ gameId }) => {
  const { data: gameData, error: gameDataFetchError } = useSWR<
    BaseResponse<EsportsGameModel>
  >(`/esports/game/${gameId}`, fetcher);

  const { data: categoryData, error: categoryDataFetchError } = useSWR<
    BaseResponse<string[]>
  >(`/games/categories`, fetcher);

  const { data: betsData, error: betsDataFetchError } = useSWR<
    BaseResponse<BetsModel[]>
  >(`/esports/bets`, fetcher);

  if (gameDataFetchError || categoryDataFetchError || betsDataFetchError)
    return <div>Error fetching data</div>;
  if (!gameData || !categoryData || !betsData) return <div>Loading...</div>;

  return (
    <>
      <EsportsGameViewContent
        gameData={gameData.data}
        categoriesData={categoryData.data}
        betsData={betsData.data}
      />
    </>
  );
};
export default EsportsGameView;
