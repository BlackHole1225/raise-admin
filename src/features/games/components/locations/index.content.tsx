"use client";
import { useState } from "react";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocationModel } from "@/features/games/types/games";
import { LocationDialogModal } from "@/features/games/components/locations/dialog-modal";
import { deleteLocation } from "../../api/game";
import { fetcherWithTotal } from "@/libs/axios";
import { COLORS } from "@/utils/colors";
import { Add } from "@mui/icons-material";

type LocationContentProps = {
  data: Array<LocationModel>;
};

export const LocationContent = ({ data }: LocationContentProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { trigger } = useSWRMutation(`/location`, fetcherWithTotal);

  const _delete = (item: LocationModel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteLocation(item._id);
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
          <Typography variant="h5">Location</Typography>
          <Box>
            <IconButton
              aria-label="Add Location"
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
        <TableContainer>
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
                <TableRow hover={true} key={i}>
                  <TableCell className="">{i + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => { _delete(item) }}
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
      </Box>
      <LocationDialogModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
