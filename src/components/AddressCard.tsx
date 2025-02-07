import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CustomerAddress } from "../Features/Customer/CustomerSlice";

const AddressCard: React.FC<CustomerAddress> = ({ address }) => {
  return (
    <Card sx={{ width: 250, maxWidth: 250, marginLeft: ".4rem", mt: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment
  @ts-expect-error */}
  
            Dirección # {address.id}: {address.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/*   <Button size="small" color="primary">
            Ver más
          </Button> */}
      </CardActions>
    </Card>
  );
};

export default AddressCard;
