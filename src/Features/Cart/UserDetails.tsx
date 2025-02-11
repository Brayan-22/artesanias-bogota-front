import { Box, Button, Typography } from "@mui/material";
import AddressCard from "../../components/AddressCard";
import { CustomerAddress, defaultCustomer } from "../Customer/CustomerSlice";
import { Link,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const UserDetails = () => {
  const currentCustomer = defaultCustomer;
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddress | null>(null);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const handleSelectedAddress = (adress: CustomerAddress) => {
    setSelectedAddress(adress);
  };

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
        p: 2,
        border: "2px solid rgba(101, 96, 96, 0.2)",
        borderRadius: "8px",
        boxShadow: "3px 3px 10px rgba(232, 188, 188, 0.2)",
        backgroundColor: "white",
        pb: 2,
        width: 500,
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Dirección seleccionada:
        </Typography>
        {selectedAddress ? (
          <i>{selectedAddress.address} </i>
        ) : (
          <i>No se ha seleccionado ninguna dirección</i>
        )}
        {currentCustomer.addresses.map((a) => (
          <Box sx={{ mt: 3 }}>
            <AddressCard
              key={a.id}
              address={a}
              handleSelectedAddress={handleSelectedAddress}
            />
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        disabled={selectedAddress ? false : true}
        onClick={()=> navigate("payment")}
      >
        Realizar pago
      </Button>
     
    </Box>
  );
};

export default UserDetails;
