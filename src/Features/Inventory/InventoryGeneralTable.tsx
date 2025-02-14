import React, { useState } from "react";
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
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { ProductResponse, selectAllProducts, useGetProductsByWarehouseIdQuery } from "../Product/Products";
import { useAppSelector } from "../../app/hooks";

const InventoryGeneralTable = () => {
  const {
    isLoading,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    isSuccess,
  } = useGetProductsByWarehouseIdQuery("1")

  const products = useAppSelector(selectAllProducts)

  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = products.map((product: ProductResponse) => ({
    id: product.id,
    nombre: product.nombre,
    descripcion: product.descripcion,
    id_categoria: product.id_categoria,
    precio: product.precio
  }));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

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

  const deleteProducts = () => {
    
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (isLoading) {
    <Typography variant="h6" sx={{ mb: 2 }}>
      Cargando...
    </Typography>;
  } 
    return (
      <Box sx={{ width: "100%", mr: 2 }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              bgcolor:
                selected.length > 0
                  ? (theme) =>
                      alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                      )
                  : undefined,
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {selected.length} seleccionado(s)
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Inventario
              </Typography>
            )}
            {selected.length > 0 ? (
              <Tooltip title="Eliminar">
                <IconButton onClick={deleteProducts}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="medium">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  {["ID", "Nombre", "Precio", "Descripción", "Id de la categoría"].map(
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
                    const isSelected = selected.includes(row.id);
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        key={row.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" checked={isSelected} />
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.precio}</TableCell>
                        <TableCell>{row.descripcion}</TableCell>
                        <TableCell>{row.id_categoria }</TableCell>
                        <TableCell>
                          <Link to={`../products/editProduct/${row.id}`}>
                            <IconButton>
                              <EditIcon />
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

export default InventoryGeneralTable;
