import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
const OrderOptions = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#FFFF", position: "sticky", mb: 3 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            <Link to="/order">
              <Button sx={{ my: 2, color: "black", display: "block", mr: 1 }}>
                1. Información
              </Button>
            </Link>

            <Link to="/order/payment">
              <Button sx={{ my: 2, color: "black", display: "block", mr: 1 }}>
                2. Pago
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default OrderOptions;
