import { useState } from "react";
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
  Button,
  TextField,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
  InventoryResponse,
  useGetInventoryByWarewouseIdQuery,
  useUpdateProductFromWarehouseInventoryMutation,
} from "../Inventory/InventorySlice";

const WarehouseTable = () => {
  const { warehouseId } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  let  { data: inventories = [], isLoading } = useGetInventoryByWarewouseIdQuery(warehouseId!);
  const [updateProductFromWarehouseInventory] = useUpdateProductFromWarehouseInventoryMutation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editableStock, setEditableStock] = useState<{ [key: string]: boolean }>({});
  const [stockValues, setStockValues] = useState<{ [key: string]: number }>({});

  const rows = inventories
    ? inventories.map((inventory: InventoryResponse) => ({
        idAlmacen: inventory.idAlmacen,
        idProducto: inventory.idProducto,
        producto: inventory.producto,
        cantidad: inventory.cantidad,
      }))
    : [];

  // Manejar cambios en el campo de stock
  const handleStockChange = (idProducto: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setStockValues((prev) => ({
        ...prev,
        [idProducto]: Number(value),
      }));
    }
  };

  // Activar edición o guardar cambios
  const toggleEditStock = async (row: InventoryResponse) => {
    const { idProducto, idAlmacen } = row;
    const isEditing = editableStock[idProducto];

    if (isEditing) {
      await updateProductFromWarehouseInventory({
        inventory: {
          idAlmacen,
          idProducto,
          cantidad: stockValues[idProducto] ?? row.cantidad, // Si no se editó, mantener el valor original
        },
      });
    }

    setEditableStock((prev) => ({
      ...prev,
      [idProducto]: !prev[idProducto],
    }));

    // Inicializa el valor de stock cuando se activa la edición
    if (!isEditing) {
      setStockValues((prev) => ({
        ...prev,
        [idProducto]: row.cantidad,
      }));
    }
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: selected.length > 0
              ? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
              : undefined,
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
            Inventario del Almacén {warehouseId}
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {["ID", "Nombre", "Cantidad", "Acciones"].map((head) => (
                  <TableCell key={head} align="left">
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.idProducto}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell>{row.idProducto}</TableCell>
                    <TableCell>{row.producto}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={stockValues[row.idProducto] ?? row.cantidad}
                        disabled={!editableStock[row.idProducto]}
                        onChange={(e) => handleStockChange(row.idProducto, e.target.value)}
                        inputProps={{ min: 0, pattern: "[0-9]*" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => toggleEditStock(row)}
                      >
                        {editableStock[row.idProducto] ? "Guardar cambios" : "Gestionar stock"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </Paper>
    </Box>
  );
};

export default WarehouseTable;
