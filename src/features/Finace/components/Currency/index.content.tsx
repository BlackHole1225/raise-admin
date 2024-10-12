"use client";
import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { CurrencyModel } from "@/types/model/finance"
import { COLORS } from "@/utils/colors";
import { Add } from "@mui/icons-material";
import { CurrencyDialogModal } from "./dialog-modal";
import { deleteCurrency } from "../../api/finance";
import { fetcherWithTotal } from "@/libs/axios";

type CurrencyContentProps = {
  data: CurrencyModel[]
}
export const CurrencyContent = ({ data }: CurrencyContentProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { trigger } = useSWRMutation(`/finance/currency`, fetcherWithTotal);
  
  const _delete = (item: CurrencyModel) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCurrency(item.currency_uuid);
          trigger();
          Swal.fire("Deleted!", "This crypto currency has been deleted.", "success");
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
          <Typography variant="h5">Currency</Typography>
          <Box>
            <IconButton
              aria-label="Add Currency"
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
                  <TableCell>{item.currency_name}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: COLORS.red }}
                      size="small"
                      onClick={()=>_delete(item)}
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
      <CurrencyDialogModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}