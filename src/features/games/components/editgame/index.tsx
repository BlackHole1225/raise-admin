"use client"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "@/libs/axios";
import { BaseResponse } from "@/types/base"
import { ResGameDataModel } from "@/types/base"
import { GenreModel, CategoryModel } from "../../types/games"
import EditGameFormContent from "./index.content"

type EditGameFormPropsType = {
  gameId: string;
}

const EditGameForm = ({gameId}: EditGameFormPropsType) => {
  // const [gameData, setGameData] = useState<ResGameDataModel>();
  // const [genres, setGenres] = useState<GenreModel[]>([]);
  // const [categories, setCategories] = useState<CategoryModel[]>([]);

  const { data: gameData, error: gameDataFetchError } = useSWR<
    BaseResponse<ResGameDataModel>
  >(`/campaign/${gameId}`, fetcher);
  


  return(
    <>
      {gameData && (
        <EditGameFormContent
          gameData={gameData.data.campaign}
        />
      )}
    </>
  )
}

export default EditGameForm;