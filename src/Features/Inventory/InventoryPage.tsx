import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletedInventoryProduct, selectInventory } from "./Inventory";
import InventoryDashBoard from "./InventoryDashBoard";
import { Outlet } from "react-router-dom";

const InventoryPage = () => {

  const [selectedProductId, setSelectedProductId] = useState(0);



  return (
    <div>
        <InventoryDashBoard selectedProductId = {selectedProductId}/>
        <InventoryTable setSelectedProductId = {setSelectedProductId}/>
        <Outlet/>
    </div>
  );
};

export default InventoryPage;
