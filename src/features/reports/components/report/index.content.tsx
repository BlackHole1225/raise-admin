"use client";
import { RoomModel } from "@/features/auth/types";
import { Select } from "flowbite-react";
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
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import useSWRMutation from "swr/mutation";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { COLORS } from "@/utils/colors";
import { fetcherWithTotal } from "@/libs/axios";

import { useSnackbar } from "@/contexts/snackbarContext";

import { removeUser, updateUserActivateStatus } from "@/features/users/api/users";
import { useEffect } from "react";
import Link from "next/link";

type ReportsListComponentProps = {
  data: Array<RoomModel>;
  count: number;
  page: number;
  perPage: number;
  trigger: any,
  onChangeSearchKeyword: (_q: string) => void;
  onChangePagination: (_page: number) => void;
  onChangePerPage: (_perPage: number) => void;
};

export const ReportsContentComponent = ({
  data,
  count,
  page,
  perPage,
  trigger,
  onChangeSearchKeyword,
  onChangePagination,
  onChangePerPage,
}: ReportsListComponentProps) => {
  const showSnackbar = useSnackbar();

  useEffect(()=>{
    console.log("data", data);    
  },[])

  const getLabelText = (element: RoomModel) => {
    if (element.room_status === 'dispute') {
      return 'Dispute';
    }
    if (element.room_status !== "finished") {
      return 'Pending';
    }
    return (element.winner?.team?.team_name).replace(/\s+/g, '') ?? "N/A";
  }

  const getLabelStyle = (element: RoomModel) => {
    if (element.room_status !== "finished") {
      return 'warning';
    }

    return 'success';
  }
  
  // const _delete = (item: RoomModel) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const res = await removeUser(item.id);
  //         trigger();
  //         Swal.fire("Deleted!", "This User has been deleted.", "success");
  //       } catch (e) {
  //         Swal.fire("Oops...", "Something went wrong", "error");
  //       } finally {
  //       }
  //     }
  //   });
  // };
  const moveDetail = () => {

  }
  return (
    <>
      {" "}
      <div className="overflow-x-auto p-5">
        <h2 className="my-2">Report</h2>
        <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Game Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Bet Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow hover={true} key={i}>
                <TableCell> {(page - 1) * 10 + (i + 1)}</TableCell>
                <TableCell>{item.game.name}</TableCell>
                <TableCell>
                  {/* <span className="text-yellow-200">{getLabelText(item)}</span> */}
                  <Badge color={getLabelStyle(item)} badgeContent={getLabelText(item)}>
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.team_size.first_team_size} vs {item.team_size.second_team_size}
                </TableCell>
                <TableCell>
                  USD {item.bet.bet_value}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: COLORS.blue }}
                    size="small"
                    href={`/reports/report/${item.room_uuid}`}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Pagination
            color={"primary"}
            count={count}
            page={page}
            variant="outlined"
            shape="rounded"
            sx={{ my: 2 }}
            onChange={(_, page) => onChangePagination(page)}
          />
        </Box>
      </div>
    </>
  );
};
