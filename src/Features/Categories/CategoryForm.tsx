import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Category, categoryCreated, categoryEdited } from "./Category";
import { useNavigate, useParams } from "react-router-dom";

const CategoryForm = ({ currentCategory }: { currentCategory: { category: Category | null } }) => {
  const {id} = useParams() || null
  const CREATE = "Crear categoría";
  const EDIT = "Editar categoría";
  const dispatch = useAppDispatch();

  // Estado interno del formulario
  const [formCategory, setFormCategory] = useState<Category | null>(null);

  // Sincroniza el estado del formulario con el estado recibido en props
  useEffect(() => {
    setFormCategory(currentCategory.category);
  }, [currentCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formCategory) {
      setFormCategory({ ...formCategory, [e.target.name]: e.target.value });
    } else {
      setFormCategory({ id: Date.now(), [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (!id) {
      dispatch(categoryCreated(formCategory));
      setFormCategory(null); // Limpiar el formulario después de agregar
    }else{
      dispatch(categoryEdited(formCategory))
    }
  };

  return (
    <form>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          id="name"
          name="name"
          value={formCategory?.name || ""}
          label="Nombre"
          variant="standard"
          onChange={handleInputChange}
        />
        <Button variant="contained" size="small" onClick={handleSubmit}>
          {id? EDIT : CREATE}
        </Button>
      </Box>
    </form>
  );
};

export default CategoryForm;
