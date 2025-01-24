import { createTheme } from "@mui/material/styles";
import palette from "./Palette";

const theme = createTheme({
  palette, // Importa la paleta personalizada
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
