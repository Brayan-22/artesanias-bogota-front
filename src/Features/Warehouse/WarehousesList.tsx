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
  CircularProgress,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useGetaWarehousesQuery, WarehouseResponse } from "./Warehouses";

const WarehouseList = () => {
  const { shopId } = useParams();

  const { data: warehouses = [] , isLoading, isSuccess } = useGetaWarehousesQuery(shopId!);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


 
    const rows = warehouses &&  warehouses.map((warehouse: WarehouseResponse) => ({
      idAlmacen: warehouse.idAlmacen,
      nombreTienda: warehouse.nombreTienda,
      direccion: warehouse.direccion,
      central: warehouse.central,
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (isSuccess) {
    return (
      <Box sx={{ width: "80%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="medium">
              <TableHead>
                <TableRow>
                  {["ID", "Tienda", "Dirección", "Almacén central"].map(
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
                        onClick={(event) => handleClick(event, row.idAlmacen)}
                        role="checkbox"
                        key={row.idAlmacen}
                      >
                        <TableCell>{row.idAlmacen}</TableCell>
                        <TableCell>{row.nombreTienda}</TableCell>
                        <TableCell>{row.direccion}</TableCell>
                        <TableCell>
                          {row.central ? "Central" : "Bodega"}
                        </TableCell>
                        <TableCell>
                          <Link to={`warehouse/${row.idAlmacen}`}>
                            <IconButton>
                              <InfoIcon />
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
  }else{
    <Typography variant="h6" sx={{ mb: 2 }}>
    Ha ocurrido un error al momento de cargar los almacenes
  </Typography>
  }
};

export default WarehouseList;
