import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CustomerAddress } from "../Features/Customer/CustomerSlice";

export interface AddressCardProps{
  address: CustomerAddress
  handleSelectedAddress:(address: CustomerAddress) => void
}

const AddressCard = ({ address, handleSelectedAddress}: AddressCardProps) => {
  return (
    <Card sx={{ width: 250, maxWidth: 250, marginLeft: ".4rem", mt: 1 }}>
      <CardActionArea onClick={() => handleSelectedAddress(address)}>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Dirección # {address.id}: {address.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddressCard;
