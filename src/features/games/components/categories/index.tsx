"use client";
import useSWR from "swr";
import { CategoryContent } from "@/features/games/components/categories/index.content";
import { CategoryModel } from "@/features/games/types/games";
import { Layout } from "@/features/layout/components";
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";

export const GameCategory = () => {
  const { data: categoryData, error } = useSWR<
    BaseResponse<CategoryModel[], PaginationMetaModel>
  >(`/category`, fetcherWithTotal);

  if (error) return <div>Error fetching data</div>;
  if (!categoryData) return <div>Loading...</div>;

  return (
    <>
      <CategoryContent data={categoryData.category} />
    </>
  );
};
