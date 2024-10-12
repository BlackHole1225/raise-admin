"use client";
import { Table, Pagination, Select } from "flowbite-react";
import { GameModel } from "../../types/games";
import Link from "next/link";
type GameListComponentProps = {
  data: Array<GameModel>;
  count: number;
  page: number;
  perPage: number;
  onChangePagination: (_page: number) => void;
  onChangePerPage: (_perPage: number) => void;
};
export const GameListComponent = ({
  data,
  count,
  page,
  perPage,
  onChangePagination,
  onChangePerPage,
}: GameListComponentProps) => {
  return (
    <>
      {" "}
      <div className="overflow-x-auto p-5">
        <div className="flex justify-between">
          <h2 className="my-2">Game</h2>
          <div>
            <Link href={"/games/create"}>Add Game</Link>
          </div>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, i) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>{item.game_name}</Table.Cell>
                <Table.Cell>
                  <button className="" onClick={() => alert("onProcessing")}>
                    Edit
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center my-5 float-right gap-4">
          <div className="flex gap-2">
            <label className="mt-2">tems per page</label>
            <Select
              id="perpage"
              sizing="md"
              onChange={(e) => {
                onChangePerPage(parseInt(e.target.value));
              }}
              defaultValue={perPage}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
          </div>
          <Pagination
            currentPage={page}
            totalPages={count}
            onPageChange={onChangePagination}
          />
        </div>
      </div>
    </>
  );
};
