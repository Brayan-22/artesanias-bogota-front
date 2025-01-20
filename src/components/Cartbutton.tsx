import React from "react";
import { Button, Badge } from "react-bootstrap";

type CartButtonProps = {
  cartItemCount: number; // Número de productos en el carrito
};

const CartButton = () => {
  return (
    <Button variant="outline-light" className="d-flex align-items-center">
      🛒
        <Badge
          bg="danger"
          className="ms-2"
          style={{
            borderRadius: "50%",
            fontSize: "0.8rem",
          }}
        >
        0
        </Badge>
      
    </Button>
  );
};

export default CartButton;
