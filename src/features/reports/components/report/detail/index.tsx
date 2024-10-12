"use client";
import useSWR from "swr";
import { BaseResponse } from "@/types/base";
import { BetsModel, EsportsGameModel } from "@/features/esports/types/esports";
import { fetcher } from "@/libs/axios";
import { CategoryModel } from "@/features/games/types/games";
import { ReportDetailContent } from "./index.content";
import { RoomModel } from "@/features/auth/types";
import { useEffect } from "react";

type EsportsGamesViewProps = {
  room_uuid: string;
};
const ReportDetail: React.FC<EsportsGamesViewProps> = ({ room_uuid }) => {
  const { data: reportData, error: reportDataFetchError } = useSWR<
    BaseResponse<RoomModel[]>
  >(`reports/esports/${room_uuid}`, fetcher);

  const { data: betsData, error: betsDataFetchError } = useSWR<
    BaseResponse<BetsModel[]>
  >(`/esports/bets`, fetcher);

  const { data: roomIdData, error: roomIdFetchError } = useSWR<
    BaseResponse<number|undefined>
  >(`reports/esports/room/${room_uuid}`, fetcher);
  useEffect(()=>{
    console.log(roomIdData); 
  },[roomIdData])
  if (reportDataFetchError || betsDataFetchError)
    return <div>Error fetching data</div>;
  if (!reportData || !betsData) return <div>Loading...</div>;

  return (
    <>
      <ReportDetailContent
        reportData={reportData.data}
        betsData={betsData.data}
        roomId = {roomIdData?.data}
      />
    </>
  );
};
export default ReportDetail;
