import EditIcon from "@mui/icons-material/Edit";
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
import React, { useState } from "react";
import {
  useGetCategoriesQuery,
} from "./Category";
import DeleteIcon from "@mui/icons-material/Delete";

interface CategoryTableProps {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  toggleCurrentCategory: (category: Category) => void;
}

const CategoryTable:React.FC<CategoryTableProps>= ({toggleCurrentCategory}) => {
  const {data: categories = [] } = useGetCategoriesQuery()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [deleteCategory] = useDeleteCategoryMutation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const rows = categories.map((category) => ({
    id: category.id,
    name: category.nombre,
    description: category.descripcion
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

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría seleccionada`)) {
      await deleteCategory(id)
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 500 }} size="medium">
              <TableHead>
                <TableRow>
                  {["ID", "Nombre", "Descripción"].map((head) => (
                    <TableCell key={head} align="left">
                      {head}
                    </TableCell>
                  ))}
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
                        onClick={(event) => handleClick(event, row.id.toString())}
                        role="checkbox"
                        key={row.id}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              toggleCurrentCategory(row);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteCategory(row.id.toString())}
                          >
                            <DeleteIcon />
                          </IconButton>
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

export default CategoryTable;
