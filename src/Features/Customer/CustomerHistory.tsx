import { Box, Card, CardContent, Typography } from "@mui/material";
import { OrderResponse, useGetOrdersQuery } from "../Order/OrderSlice";

const CustomerHistory = () => {
  const { /* data: orders = [], */ isSuccess, isLoading } = useGetOrdersQuery();

  const orders:  OrderResponse[] = [
    {
      id: "ORD12345",
      idCliente: "CLI56789",
      idStatus: 2,
      total: 189.99,
    },
    {
      id: "ORD67890",
      idCliente: "CLI12345",
      idStatus: 1,
      total: 75.49,
    },
    {
      id: "ORD54321",
      idCliente: "CLI98765",
      idStatus: 3,
      total: 320.75,
    },
  ];

  if (isLoading) {
  } else if (isSuccess) {
    return (
      <Box sx={{display: "flex", flexWrap:'wrap', flexDirection:'column',alignItems:'center'}}>
        <Typography variant="h3" component="div">
                Histórico de Compras
              </Typography>
        {orders && orders.map((order) => (
            <Card sx={{ minWidth: 275, maxWidth: 400, m: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Pedido ID: {order.id}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Cliente ID: {order.idCliente}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Estado: {order.idStatus}
              </Typography>
              <Typography variant="h6" color="success.main">
                Total: ${order.total.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }
};

export default CustomerHistory;
