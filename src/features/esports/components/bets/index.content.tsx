"use client";
import { useState } from "react";
import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import Swal from "sweetalert2";
import { EsportsBetsDialogModal } from "@/features/esports/components/bets/dialog-modal";
import { deleteBet } from "@/features/esports/api/esports";
import { fetcherWithTotal } from "@/libs/axios";
import { BetsModel } from "@/features/esports/types/esports";
import { COLORS } from "@/utils/colors";
import { Add as AddIcon, Delete as DeleteIcon} from "@mui/icons-material";

type EsportsBetsContentProps = {
  data: Array<BetsModel>;
};

export const EsportsBetsContent = ({ data }: EsportsBetsContentProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { trigger } = useSWRMutation(`/esports/bets`, fetcherWithTotal);

  const _delete = (item: BetsModel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBet(item.bet_uuid);
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
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Typography variant="h5">Bets</Typography>
          <Box>
            <IconButton
              aria-label="Add game"
              sx={{
                backgroundColor: COLORS.blue,
                color: "#fff",
                "&:hover": {
                  backgroundColor: COLORS.blue600,
                },
              }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <AddIcon />
            </IconButton>{" "}
          </Box>
        </Box>
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader>
            <TableHead>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>
                <span className="sr-only">Edit</span>
              </TableCell>
            </TableHead>
            <TableBody className="divide-y">
              {data.map((item, i) => (
                <TableRow
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </TableCell>
                  <TableCell>USD {item.bet_value}</TableCell>
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
        <EsportsBetsDialogModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Box>
    </>
  );
};
