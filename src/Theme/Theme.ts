import { createTheme } from "@mui/material/styles";
import palette from "./Palette";

// Extiende PaletteOptions para agregar la propiedad customColor
declare module "@mui/material/styles" {
  interface Palette {
    customColor: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
      success: string;
    };
  }
  interface PaletteOptions {
    customColor?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
      success: string;
    };
  }
}

const theme = createTheme({
  palette, // Usa la paleta personalizada
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;