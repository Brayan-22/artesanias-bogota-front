import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const InventoryDashBoard = () => {
  return (
    <Box
      sx={{ width: "100%", maxWidth: 150, bgcolor: "background.paper", mr: 2 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Link to={`/managerInventory`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/managerInventory/shops`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Shops" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`/managerInventory/categories`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categorías" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to={`/managerInventory`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QueryStatsIcon />
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

export default InventoryDashBoard;
