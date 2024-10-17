"use client"
import useSWR from "swr"
import { fetcher } from "@/libs/axios";
import { BaseResponse, ResCampaignDataModel } from "@/types/base"
import SetKycFormContent from "./index.content"

type EditGameFormPropsType = {
  gameId: string;
}

const SetKycForm  = ({gameId}: EditGameFormPropsType) => {
  const { data: campaignData, error: campaignDataFetchError } = useSWR<
    BaseResponse<ResCampaignDataModel>
  >(`/campaign/${gameId}`, fetcher);
  return(
    <>
      {campaignData && (
        <SetKycFormContent
          campaignData={campaignData?.data.campaign}
        />
      )}
    </>
  )
}

export default SetKycForm;