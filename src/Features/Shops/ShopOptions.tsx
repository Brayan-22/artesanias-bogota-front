import AddIcon from '@mui/icons-material/Add';
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
const shopOptions = () => {
  const {shopId} = useParams();
  return (
    <Box
      sx={{ width: "100%", maxWidth: 150, bgcolor: "background.paper", mr: 2 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Link to={`../shops/${shopId}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Almacenes" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`../shops/${shopId}/createWarehouse`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Agregar Almacen" />
              </ListItemButton>
            </ListItem>
          </Link>
          
        </List>
      </nav>
    </Box>
  );
};

export default shopOptions;
