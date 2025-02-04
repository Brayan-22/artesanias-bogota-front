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
const WarehouseDashBoard = () => {
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const {warehouseId} = useParams();
  return (
    <Box
      sx={{ width: "100%", maxWidth: 150, bgcolor: "background.paper", mr: 2 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <Link to={`products`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={`products/createProduct`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Agregar producto" />
              </ListItemButton>
            </ListItem>
          </Link>
          
        </List>
      </nav>
    </Box>
  );
};

export default WarehouseDashBoard;
