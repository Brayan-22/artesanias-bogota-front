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
import { Link } from "react-router-dom";
import SellIcon from "@mui/icons-material/Sell";
import BarChartIcon from "@mui/icons-material/BarChart";
const shopOptions = () => {
  /* const {shopId} = useParams(); */
  const shopId = 1;
  return (
    <Box
      sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper", ml: 2 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Link to={`/manager/${shopId}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Almacenes" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/manager/${shopId}/createWarehouse`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Agregar Almacen" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/manager/${shopId}/products`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/manager/${shopId}/products/createProduct`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Agregar Productos" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to={`/manager/${shopId}/createWarehouse`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SellIcon />
                </ListItemIcon>
                <ListItemText primary="Ventas" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/manager/${shopId}/createWarehouse`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Estadísticas" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Box>
  );
};

export default shopOptions;
