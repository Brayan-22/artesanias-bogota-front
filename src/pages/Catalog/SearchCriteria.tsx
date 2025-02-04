import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { useGetCategoriesQuery } from "../../Features/Categories/Category";
import { useGetshopsQuery } from "../../Features/Shops/ShopSlice";

const SearchCriteria = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: shops = [] } = useGetshopsQuery();

   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleFilterByCategory = (event: React.ChangeEvent<HTMLInputElement>  ) => {};
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const handleFilterByShop = (event: React.ChangeEvent<HTMLInputElement>  ) => {};

  const sortByPrice = () => {};

  const sortByBestSellers = () => {};

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
          defaultValue={30}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10} onClick={sortByBestSellers}>
            Más vendidos
          </option>
          <option value={20} onClick={sortByPrice}>
            Menor precio
          </option>
          <option value={30} onClick={sortByPrice}>
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
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                defaultChecked={false}
                key={category.id}
                control={
                  <Checkbox
                    onChange={handleFilterByCategory}
                    defaultChecked={false}
                  />
                }
                label={category.name}
                value={category.id}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
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
                control={<Checkbox 
                  onChange={handleFilterByShop}
                  defaultChecked={false} />}
                label={shop.name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchCriteria;
