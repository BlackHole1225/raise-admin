"use client"
import useSWR from "swr";

import { WithdrawContent } from "./index.content"
import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { WithdrawModel, WithdrawStatus } from "@/types/model/finance";
import { useState } from "react";


export const Withdraw = () => { 
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [status, setStatus] = useState<WithdrawStatus>('pending')
  const { data, error } = useSWR<
    BaseResponse<WithdrawModel[], PaginationMetaModel>
  >(`/finance/withdraws?page=${page}&pagination[per_page]=${perPage}&filters[status]=${status}`, fetcherWithTotal);
  
    if (error) return <div>Error fetching data</div>;
    if (!data) return <div>Loading...</div>;
  return (
    <WithdrawContent 
      page={page}
      perPage={perPage}
      count={Math.ceil(data.meta.pagination.total / perPage)}
      onChangePagination={(page: number) => setPage(page)}
      onChangePerPage={(perPage: number) => setPerPage(perPage)}
      data={data.data}
    />
  )
}