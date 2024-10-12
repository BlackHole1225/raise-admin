import { WithdrawModel } from "@/types/model/finance"
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
import { COLORS } from "@/utils/colors";

type WithdrawContentProps = {
  data: WithdrawModel[];
  count: number;
  page: number;
  perPage: number;
  onChangePagination: (_page: number) => void;
  onChangePerPage: (_perPage: number) => void;
}
export const WithdrawContent = ({
  data,
  count,
  page,
  perPage,
  onChangePagination,
  onChangePerPage
}:WithdrawContentProps) => {
  return (
    <Box>
       <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Typography variant="h5">Withdraw Request</Typography>
        </Box>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { data.map((item, i) => (
            <TableRow hover={true} key={i}>
              <TableCell>{(page - 1) * 10 + (i + 1)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
        ))}
        
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}