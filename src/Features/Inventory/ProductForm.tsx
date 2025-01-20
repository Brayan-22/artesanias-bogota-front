import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectInventoryProduct } from "./Inventory";

const ProductForm = () => {
  const {id} = useParams()
  const productId = parseInt(id)
  console.log(id);
  
  const product = useAppSelector(state => selectInventoryProduct(state, productId))

  const [currentProduct, setCurrentProduct ] = useState(product)
  
  return (
    <div className="d-flex justify-content-center mt-5">
      <Form className="w-75">
        <Row className="mb-3 d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/src/assets/images/product1.jpg"  />
            <Card.Body>
              
              <Button variant="secondary">Upload image</Button>
            </Card.Body>
          </Card>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" value={currentProduct?.name} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"  value={currentProduct?.description}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={currentProduct?.price} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number"  value={currentProduct?.stock} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2" className="mt-4">
            <DropdownButton
              variant="outline-secondary"
              title="Category"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Random</Dropdown.Item>
              <Dropdown.Item href="#">Random</Dropdown.Item>
              <Dropdown.Item href="#">Random</Dropdown.Item>
              <Dropdown.Item href="#">Random</Dropdown.Item>
            </DropdownButton>
          </Form.Group>
        </Row>

        <Button variant="success" type="submit" className="mb-4">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
