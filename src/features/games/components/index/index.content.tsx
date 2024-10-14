"use client";

import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { GameModel } from "../../types/games";
import Link from "next/link";
import { COLORS } from "@/utils/colors";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteGame } from "../../api/game";

type GamesContentProps = {
  data: Array<GameModel>;
  count: number;
  page: number;
  perPage: number;
  onChangePagination: (_page: number) => void;
  onChangePerPage: (_perPage: number) => void;
  onDelete: (_gameId: string) => void;
};

export const GamesContent = ({
  data,
  count,
  page,
  perPage,
  onChangePagination,
  onChangePerPage,
  onDelete,
}: GamesContentProps) => {
  return (
    <>
      {" "}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Typography variant="h5" color={"black"}>Campaigns</Typography>
          <Box>
           
          </Box>
        </Box>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>title</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => (
                <TableRow hover={true} key={item._id}>
                  <TableCell> {(page - 1) * perPage + (i + 1)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/campaign/${item._id}`}
                      style={{ color: "#24a4e2" }}
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: COLORS.red }}
                      size="small"
                      onClick={() => onDelete(item._id)}
                    >
                      <DeleteIcon fontSize="small"/>
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
      </Box>
    </>
  );
};
