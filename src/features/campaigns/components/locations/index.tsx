"use client";
import useSWR from "swr";
import { CategoryContent } from "@/features/campaigns/components/categories/index.content";
import { CategoryModel, LocationModel } from "@/features/campaigns/types/games";
import { Layout } from "@/features/layout/components";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { LocationContent } from "./index.content";
import useSWRMutation from "swr/mutation";

export const CampaignLocations = () => {
  const { data: locationData, error } = useSWR<
    BaseResponse<LocationModel[], PaginationMetaModel>
  >(`/location`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!locationData) return <div>Loading...</div>;

  return (
    <>
        <LocationContent data={locationData.country} />
    </>
  );
};
