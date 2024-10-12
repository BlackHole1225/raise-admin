"use client";
import { useState } from "react";
import { Table } from "flowbite-react";
import Swal from "sweetalert2";
import useSWRMutation from "swr/mutation";
import { CategoryModel } from "@/features/games/types/games";
import { deleteCategory } from "@/features/games/api/game";
import { CategoryDialogModal } from "@/features/games/components/categories/dialog-modal";
import { fetcherWithTotal } from "@/libs/axios";

type CategoryContentProps = {
  data: Array<CategoryModel>;
};

export const CategoryContent = ({ data }: CategoryContentProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { trigger } = useSWRMutation(`/games/categories`, fetcherWithTotal);

  const _delete = (item: CategoryModel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCategory(item.category_uuid);
          trigger();
          Swal.fire("Deleted!", "This game has been deleted.", "success");
        } catch (e) {
          Swal.fire("Oops...", "Something went wrong", "error");
        } finally {
        }
      }
    });
  };
  return (
    <>
      {" "}
      <div className="overflow-x-auto p-5">
        <div className="flex justify-between">
          <h2 className="my-2">Category</h2>
          <div>
            <button
              className=""
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add Category
            </button>
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
                <Table.Cell>{item.category_name}</Table.Cell>
                <Table.Cell>
                  <button className="" onClick={() => alert("processing")}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <CategoryDialogModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
