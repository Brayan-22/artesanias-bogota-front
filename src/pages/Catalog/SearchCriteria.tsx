import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../Features/Categories/Category";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { apiSliceWithProducts } from "../../Features/Product/Products";


const SearchCriteria = () => {
  const { isLoading: categoriesLoading } = useGetCategoriesQuery();
  const categories = useAppSelector(selectAllCategories);



  const sortByPrice = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    let result;
  
    if (value === "0") {
      // Restablecer productos al estado original (sin orden)
      result = await store.dispatch(
        apiSliceWithProducts.endpoints.getProducts.initiate(undefined)
      );
    } else if (value === "20") {
      // Ordenar de menor a mayor
      result = await store.dispatch(
        apiSliceWithProducts.endpoints.getSortedProductsByPrice.initiate("ASC")
      );
    } else if (value === "30") {
      // Ordenar de mayor a menor
      result = await store.dispatch(
        apiSliceWithProducts.endpoints.getSortedProductsByPrice.initiate("DESC")
      );
    }
  
    if (result?.data) {
      store.dispatch(
        apiSliceWithProducts.util.updateQueryData(
          "getProducts",
          undefined,
          () => result.data
        )
      );
    }

  };



  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 200,
        bgcolor: "background.paper",
        mr: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Ordenar por
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          onChange={sortByPrice}
        >
          <option value={0} >
            Por defecto
          </option>
          <option value={10}/*  onChange={sortByBestSellers} */>
            Más vendidos
          </option>
          <option value={20} >
            Menor precio
          </option>
          <option value={30} >
            Mayor precio
          </option>
        </NativeSelect>
      </FormControl>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Categorías</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categoriesLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  defaultChecked={false}
                  key={category.id}
                  control={
                    <Checkbox
                      value={category.id}
                    
                      defaultChecked={false}
                    />
                  }
                  label={category.nombre}
                  value={category.id}
                />
              ))}
            </FormGroup>
          )}
        </AccordionDetails>
      </Accordion>
     {/*  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Almacenes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
             {shops.map((shop) => (
              <FormControlLabel
                key={shop.id}
                control={
                  <Checkbox
                    onChange={handleFilterByShop}
                    defaultChecked={false}
                  />
                }
                label={shop.name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default SearchCriteria;
