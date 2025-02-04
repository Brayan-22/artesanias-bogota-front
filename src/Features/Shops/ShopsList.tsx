 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, {  useState } from "react";

import { Link } from "react-router-dom";
import { useGetshopsQuery } from "./ShopSlice";

const shopsList = () => {
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const {data: shops = [], isLoading, isSuccess} = useGetshopsQuery() 


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = shops.map((shop) => ({
    id: shop.id,
    name: shop.name,
    location_id: shop.location_id,
  }));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const newSelected: string = id;

    setSelected(newSelected);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "80%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <TableHead>
              <TableRow>
                {["ID", "Nombre", "Dirección"].map(
                  (head) => (
                    <TableCell key={head} align="left">
                      {head}
                    </TableCell>
                  )
                )}
                <TableCell align="left">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      key={row.id}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.location_id}</TableCell>
                      <TableCell>
                        <Link to={`${row.id}`}>
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Link>
                        {/* <Link to={`shop/editShop/${row.id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default shopsList;
