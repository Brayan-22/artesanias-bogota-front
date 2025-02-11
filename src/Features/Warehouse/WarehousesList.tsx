import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@mui/material";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import { useGetaWarehousesQuery } from "./Warehouses";

const WarehouseList = () => {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const {data: warehouses = []} = useGetaWarehousesQuery()


   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const rows = warehouses.map((warehouse) => ({
    id: warehouse.idAlmacen,
   
    name: warehouse.nombre,

    location_id: warehouse.location_id,
 
    is_central: warehouse.is_central
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
                {["ID", "Nombre", "Dirección", "Almacén central"].map(
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
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
                      <TableCell>{row.is_central ? "True" : "false"}</TableCell>
                      <TableCell>
                        <Link to={`warehouse/${row.id}`}>
                        <IconButton>
                          <InfoIcon/>
                        </IconButton>
                        </Link>
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

export default WarehouseList;
