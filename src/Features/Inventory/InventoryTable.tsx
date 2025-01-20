import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectedInventoryProduct,
  selectInventory,
  selectInventoryProduct,
} from "./Inventory";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const InventoryTable = ({setSelectedProductId}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(selectInventory);
  const state = useState();
  const [slectedProductId, setSlectedProductId] = useState(0);
  const [currentId, setCurrentId] = useState(0)

  const toggleSelectRow = (e, productId: number) => {
    const selectedRow = e.target.parentElement.parentElement;
    selectedRow.classList.toggle("table-primary");
    setSlectedProductId(productId);
    setSelectedProductId(productId)
   
  };

  const selectRow = ( productId: number) => {
    console.log("id: " + productId);
    
    setCurrentId(productId)
  }
 

  const handleEditProduct = () => {
    navigate(`/editProduct/${currentId}`);
  }

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>
            <td>
              <input type="checkbox" className="rounded-circle" />
            </td>
          </th>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.products.map((product) => (
          <tr key={product.id} onClick={()=>selectRow(product.id)}>
            <td>
              <input
                type="checkbox"
                className=""
                onClick={(e) => {
                  toggleSelectRow(e, product.id);
                  
                }}
              />
            </td>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <EditIcon style={{ cursor: "pointer" }} onClick={handleEditProduct} /> {/* Ícono de lápiz */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InventoryTable;
