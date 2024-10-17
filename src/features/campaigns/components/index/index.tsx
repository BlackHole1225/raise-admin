"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { CampaignsContent } from "@/features/campaigns/components/index/index.content";
import { deleteGame } from "../../api/game";
import { useSnackbar } from "@/contexts/snackbarContext";
import useSWRMutation from "swr/mutation";

export const Campaigns = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const showSnackbar = useSnackbar();
  const { data: campaignData, error } = useSWR<
    BaseResponse<CampaignModel[], PaginationMetaModel>
  >(`/campaign/search?page=${page}&pagination[per_page]=${perPage}`, fetcherWithTotal);
  const { trigger } = useSWRMutation(`/campaign/search?page=${page}&pagination[per_page]=${perPage}`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!campaignData) return <div>Loading...</div>;

  const onDeleteGame = async (gameId: string) => {
    const res = await deleteGame(gameId);
    if (res.data.status) {
      showSnackbar({
        newMessage: "Game removed successfully.",
        newSeverity: "success",
      });
      trigger();
    } else {
      showSnackbar({
        newMessage: "Game remove failed.",
        newSeverity: "error",
      });
    }
  };

  return (
    <>
      <CampaignsContent
        data={campaignData.data}
        page={page}
        perPage={perPage}
        count={Math.ceil(campaignData.pagination.totalPages / perPage)}
        onChangePagination={(page: number) => setPage(page)}
        onChangePerPage={(perPage: number) => setPerPage(perPage)}
        onDelete={onDeleteGame}
      />
    </>
  );
};
