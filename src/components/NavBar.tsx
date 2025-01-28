import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";



const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#FFFF", position: "sticky", mb: 3 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FF6C1F",
                textDecoration: "none",
              }}
            >
              ARTESANÍAS BOGOTÁ
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", color: "customColor.main",  },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none", },   }}
            >
              <Link to="/products">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>CATÁLOGO</Typography>
                </MenuItem>
              </Link>

              <Link to="/login">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    INICIAR SESIÓN
                  </Typography>
                </MenuItem>
              </Link>
              <Cart />
              <MenuItem onClick={handleCloseNavMenu}></MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "customColor.main",
              textDecoration: "none",
            }}
          >
            ARTESANÍAS BOGOTÁ
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            <Link to="/products">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block", mr:1 }}
              >
                CATÁLOGO
              </Button>
            </Link>

            <Link to="/login">
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "customColor.contrastText",
                  display: "block",
                  backgroundColor: "customColor.main",
                  mr:1,
                }}
              >
                INICIAR SESIÓN
              </Button>
            </Link>

            <Cart />
          </Box>
        
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
