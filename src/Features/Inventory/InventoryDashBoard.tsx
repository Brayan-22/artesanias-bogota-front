import React from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import BasicButton from "../../components/BasicButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletedInventoryProduct, selectInventory } from "./Inventory";
import { useNavigate } from "react-router-dom";



const InventoryDashBoard = (selectedProductId: number) => {
  const navigate = useNavigate()
   const inventoryProducts = useAppSelector(selectInventory)
    const dispatch = useAppDispatch()
    
  const handleDeleteSelectedProduct = (productId: number) => {
    console.log(productId)
      dispatch(deletedInventoryProduct(productId.selectedProductId))
    }
  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search product"
              aria-label="Search product"
              aria-describedby="Search product"
            />
            <Button variant="outline-secondary" id="button-addon2">
              <SearchIcon />
            </Button>
          </InputGroup>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="light" size="sm">Add category</Button>
          <Button variant="dark" size="sm" className="ms-2">
            Add product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Category"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="outline-secondary"
              title="Price"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="outline-secondary"
              title="Dropdown"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>
        <Col className="d-flex justify-content-end mt-1">
          <Button size="sm" variant="danger" onClick={() => {handleDeleteSelectedProduct(selectedProductId)}}>
            Delete <i className="bi bi-trash"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryDashBoard;
