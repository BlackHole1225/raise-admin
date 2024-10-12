"use client";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import Swal from "sweetalert2";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteGenre } from "@/features/games/api/game";
import { fetcherWithTotal } from "@/libs/axios";
import { GenreModel } from "@/features/games/types/games";
import { GenresDialogModal } from "@/features/games/components/genres/dialog-modal/index";
import { Add } from "@mui/icons-material";
import { COLORS } from "@/utils/colors";

type GenresContentProps = {
  data: Array<GenreModel>;
};

export const GenresContent = ({ data }: GenresContentProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { trigger } = useSWRMutation(`/games/genres`, fetcherWithTotal);

  const _delete = (item: GenreModel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteGenre(item.genre_uuid);
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
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h5">Genres</Typography>

          <Box>
            <IconButton
              aria-label="Add Genres"
              onClick={() => {
                setOpenModal(true);
              }}
              sx={{
                backgroundColor: COLORS.blue,
                color: "#fff",
                "&:hover": {
                  backgroundColor: COLORS.blue600,
                },
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
        <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader>
        <TableHead>
        <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </TableCell>
                <TableCell>{item.genre_name}</TableCell>
                <TableCell>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: COLORS.red }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </div>
      <GenresDialogModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
