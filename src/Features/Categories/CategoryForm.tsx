import { Box, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const CategoryForm = () => {
  const { id } = useParams<{ id?: string }>(); // Definir id como string | undefined
  const CREATE = "Crear categoría";
  const EDIT = "Editar categoría";


  return (
    <form>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          variant="standard"
        />
        <Button variant="contained" size="small">
          {id ? EDIT : CREATE}
        </Button>
      </Box>
    </form>
  );
};

export default CategoryForm;
