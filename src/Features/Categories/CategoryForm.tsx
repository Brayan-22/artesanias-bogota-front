import { Box, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  Category,
  useAddNewCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./Category";
import { useEffect, useState } from "react";

const CategoryForm = () => {
  const { categoryId } = useParams();
  const CREATE = "Crear categoría";
  const EDIT = "Editar categoría";
  const [updateCategory] = useUpdateCategoryMutation();
  const [addNewCategory] = useAddNewCategoryMutation();

  

  const { data: category } = useGetCategoryQuery(Number(categoryId))
  
  const [currentCategory, setCurrentCategory] = useState(category);

  useEffect(() => {
    setCurrentCategory(category);
  }, [category]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentCategory({ ...currentCategory, name: value } as Category);
  };

  const handleEditCategory = async () => {
    currentCategory && await updateCategory({...currentCategory, id: Number(categoryId)});
  };

  const handleCreateCategory = async () => {
    currentCategory && await addNewCategory({name: currentCategory.name, description:"random"})
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    category ? handleEditCategory() : handleCreateCategory();
    setCurrentCategory(undefined)
  };

  return (
    <Box
      sx={{ display: "flex", gap: 2, mb:3 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="name"
        name="name"
        label="Nombre"
        variant="standard"
        value={currentCategory?.name ?? ""}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" size="small">
        {categoryId ? EDIT : CREATE}
      </Button>
    </Box>
  );
};

export default CategoryForm;
