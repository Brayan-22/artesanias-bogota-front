import { PaletteOptions } from "@mui/material/styles/createPalette";

const palette: PaletteOptions = {
  primary: {
    main: "#6A1B9A", // Morado oscuro
    light: "#9c4dcc", // Morado claro
    dark: "#38006b", // Morado más oscuro
    contrastText: "#ffffff", // Texto blanco
  },
  secondary: {
    main: "#ff4081", // Rosa principal
    light: "#ff79b0", // Rosa claro
    dark: "#c60055", // Rosa oscuro
    contrastText: "#000000", // Texto negro
  },
  customColor: {
    main: "#FF6C1F", // Naranja
    light: "#80e27e", // Verde claro
    dark: "#000000", // Negro
    contrastText: "#FFFF", // Blanco
    success: "#00b27d", // Verde de éxito
  },
};

export default palette;
