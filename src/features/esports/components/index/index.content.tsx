"use client";
import Link from "next/link";
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

import { EsportsGameModel } from "@/features/esports/types/esports";
import { COLORS } from "@/utils/colors";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

type EsportsGamesContentProps = {
  data: Array<EsportsGameModel>;
  count: number;
  page: number;
  perPage: number;
  onChangePagination: (_page: number) => void;
  onChangePerPage: (_perPage: number) => void;
};
export const EsportsGamesContent = ({
  data,
  count,
  page,
  perPage,
  onChangePagination,
  onChangePerPage,
}: EsportsGamesContentProps) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h5">ESports Game</Typography>
        <Box>
          <Link href={"/esports-games/add"}>
            <IconButton
              aria-label="Add game"
              sx={{
                backgroundColor: COLORS.blue,
                color: "#fff",
                "&:hover": {
                  backgroundColor: COLORS.blue600,
                },
              }}
            >
              <Add />
            </IconButton>{" "}
          </Link>
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
              <TableRow hover={true} key={item.id}>
                <TableCell> {(page - 1) * 10 + (i + 1)}</TableCell>
                <TableCell>
                  <Link
                    href={`/esports-games/${item.id}`}
                    style={{ color: "#24a4e2" }}
                  >
                    {item.name}
                  </Link>
                </TableCell>
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
      <div className="flex overflow-x-auto sm:justify-center my-5 float-right gap-4">
        {/* <div className="flex gap-2">
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
          </div> */}
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
        {/* <Pagination
            currentPage={page}
            totalPages={count}
            onPageChange={onChangePagination}
          /> */}
      </div>
    </Box>
  );
};
