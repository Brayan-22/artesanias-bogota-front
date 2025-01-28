import { Box } from "@mui/material";
import { useState } from "react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import { Category } from "./Category";
import { useNavigate } from "react-router-dom";

export interface CurrentCategory {
  category: Category 
}

const defaultCategory: CurrentCategory = {
  category: {
    id: 0,
    name: ""
  }
};

const CategoriesPage = () => {
  const [currentCategory, setCurrentCategory] =
    useState<CurrentCategory>(defaultCategory);
  const navigate = useNavigate();

  const toggleCurrentCategory = (category: Category) => {

    if (currentCategory.category === null) {
      setCurrentCategory({ category });
      navigate(`/categories/${category.id}`);
    } else if (currentCategory.category?.id === category.id) {
      setCurrentCategory(defaultCategory);
      navigate(`/categories`);
    } else {
      setCurrentCategory({ category });
      navigate(`/categories/${category.id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CategoryForm  />
      <CategoryTable toggleCurrentCategory={toggleCurrentCategory} />
    </Box>
  );
};

export default CategoriesPage;
