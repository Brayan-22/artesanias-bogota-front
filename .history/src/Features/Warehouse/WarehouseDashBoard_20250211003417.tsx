import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import SellIcon from "@mui/icons-material/Sell";
import { useAppSelector } from "../../app/hooks";

const WarehouseDashBoard = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const { warehouseId } = useParams();

  const adminOptions = <>

    <Link to={`/admin/warehouse/${warehouseId}/products`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Catalogo de productos" />
        </ListItemButton>
      </ListItem>
    </Link>

    <Link to={`/admin/warehouse/${warehouseId}`}>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Inventario del almacen" />
    </ListItemButton>
  </ListItem>
</Link>
  </>;
  
  const managerOptions =<>
  <Link to={`../warehouse/${warehouseId}`}>
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Productos del almacen" />
    </ListItemButton>
  </ListItem>
</Link>
    <Link to={`../warehouse/${warehouseId}/inventory`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Asignar productos" />
        </ListItemButton>
      </ListItem>
    </Link>
    <Link to={`/manager/createWarehouse`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SellIcon />
          </ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItemButton>
      </ListItem>
    </Link>
  </> ;

  return (
    <Box
      sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper", mr: 2 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          
          {testMode.mode === "manager" ? managerOptions : adminOptions}
        </List>
      </nav>
    </Box>
  );
};

export default WarehouseDashBoard;
