"use client";

import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { fetcherWithTotal } from "@/libs/axios";
import { BaseResponse, PaginationMetaModel } from "@/types/base";
import { UserModel } from "@/features/auth/types";
import { UserContentComponent } from "@/features/users/components/users/index.content";
import { Layout } from "@/features/layout/components";

export const Users = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [searchKeyword, setSearchkeyword] = useState<string>("");

  const { data: u, error } = useSWR<
    BaseResponse<UserModel[], PaginationMetaModel>
  >(
    `/users?page=${page}&pagination[per_page]=${perPage}&filters[search]=${searchKeyword}`,
    fetcherWithTotal
  );
  
  const { trigger } = useSWRMutation(`/users?page=${page}&pagination[per_page]=${perPage}&filters[search]=${searchKeyword}`,
    fetcherWithTotal);
  if (error) return <div>Error fetching data</div>;
  if (!u) return <div>Loading...</div>;
  return (
    <>
      <UserContentComponent
        data={u.data}
        page={page}
        perPage={perPage}
        trigger={trigger}
        count={Math.ceil(u.meta.pagination.total / perPage)}
        onChangeSearchKeyword={(q: string) => setSearchkeyword(q)}
        onChangePagination={(page: number) => setPage(page)}
        onChangePerPage={(perPage: number) => setPerPage(perPage)}
      />
    </>
  );
};
