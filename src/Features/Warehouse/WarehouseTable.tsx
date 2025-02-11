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
import {  useParams } from "react-router-dom";
import { useGetInventoryByWarewouseIdQuery, useUpdateProductFromWarehouseInventoryMutation } from "../Inventory/InventorySlice";



const WarehouseTable = () => {
  const { warehouseId } = useParams();
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { data: products, isLoading } = useGetInventoryByWarewouseIdQuery(warehouseId!)
  const [updateProductFromWarehouseInventory] = useUpdateProductFromWarehouseInventoryMutation()
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editableStock, setEditableStock] = useState<{ [key: string]: boolean }>({});

  const rows = products ? products.map((product) => ({
    id: product.idProducto,
    name: product.producto,
    stock: product.cantidad,
    inventoryId: product.id
  })) : [];

  const toggleEditStock = (id: string) => {
    setEditableStock((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const handleSaveStock = async (inventoryId: string, stock: number)=> {
    console.log(`Guardar cambios del producto ${inventoryId} con nuevo stock: ${stock}`);
    await updateProductFromWarehouseInventory({ inventoryId, inventory: {cantidad: stock} })
      
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: selected.length > 0 ? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) : undefined,
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
                {["ID", "Nombre", "Stock", "Precio", "Categoría", "Descripción", "Acciones"].map((head) => (
                  <TableCell key={head} align="left">
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      defaultValue={row.stock}
                      disabled={!editableStock[row.id]}
                       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
                     onChange={(e) => handleSaveStock(row.id, row.stock)} 
                      inputProps={{ min: 0, pattern: "[0-9]*" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() => toggleEditStock(row.id)}
                    >
                      {editableStock[row.id] ? "Guardar cambios" : "Gestionar stock"}
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
