"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../app/hooks";
import { selectAllCategories } from "../Features/Categories/Category";
import { selectProductsByCategoryId } from "../Features/Inventory/Inventory";

const ProductSearchCriteria: React.FC = () => {
  const categories = useAppSelector(selectAllCategories);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);


  const handleSelectCategories = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      setSelectedCategories((prev) => [...prev, id]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== id));
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 2,
        mx: "auto",
        width: "25%",
      }}
    >
      {/* Selector de orden */}
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Ordenar:
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: "order",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Más vendido</option>
          <option value={20}>Mayor precio</option>
          <option value={30}>Menor precio</option>
        </NativeSelect>
      </FormControl>

      {/* Filtro por categorías */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Categorías</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            label="Todas las categorías"
            control={
              <Checkbox
                indeterminate={selectedCategories.length > 0 && selectedCategories.length < categories.length}
                checked={selectedCategories.length === categories.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories(categories.map((category) => category.id));
                  } else {
                    setSelectedCategories([]);
                  }
                }}
              />
            }
          />
          {categories.map((category) => (
            <Box key={category.id} sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              <FormControlLabel
                label={category.name}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleSelectCategories(e, category.id)}
                  />
                }
              />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Placeholder para tiendas */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Tiendas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">Funcionalidad pendiente</Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ProductSearchCriteria;
