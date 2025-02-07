import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddressCard from "../../components/AddressCard";
import { defaultCustomer } from "../Customer/CustomerSlice";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const currentCustomer = defaultCustomer;

  if (!currentCustomer) {
    return (
      <Box>
        <Typography sx={{ textAlign: "center" }}>
          ¡Es necesario que inicia sesión!
        </Typography>
        <Link to="/login">
          <Button
            size="medium"
            variant="contained"
            sx={{
              backgroundColor: "customColor.dark",
              color: "customColor.contrastText",
              mb: 3,
            }}
          >
            Ingresar
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Direcciones:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          /*   value={value}
          onChange={handleChange} */
        >
          {currentCustomer.addresses.map((a) => (
            <>
              <FormControlLabel
                value={a.address}
                control={<Radio />}
                label={a.address}
                required
              />
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error */}
              <AddressCard address={a} />
            </>
          ))}
        </RadioGroup>
      </FormControl>
      <Link to="payment">
        <Button variant="contained">Realizar pago</Button>
      </Link>
    </Box>
  );
};

export default UserDetails;
