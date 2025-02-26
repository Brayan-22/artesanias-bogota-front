import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Catalog from "./pages/Catalog/Catalog";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar";
import ProductPage from "./pages/Catalog/ProductPage/ProductPage";
import ProductForm from "./Features/Product/ProductForm";
import LoginPage from "./pages/LoginPage/LoginPage";
import WarehousePage from "./Features/Warehouse/WarehousePage";
import InventoryGeneralTable from "./Features/Inventory/InventoryGeneralTable";
import WarehouseTable from "./Features/Warehouse/WarehouseTable";
import WarehouseList from "./Features/Warehouse/WarehousesList";
import WarehouseForm from "./Features/Warehouse/WarehouseForm";
import ShopPage from "./Features/Shops/ShopPage";
import OrderPage from "./Features/Cart/OrderPage";
import UserDetailsLayout from "./Features/Cart/UserDetailsLayout";
import UserDetails from "./Features/Cart/UserDetails";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CustomerHistory from "./Features/Customer/CustomerHistory";
import CustomerInfo from "./Features/Customer/CustomerInfo";
import CustomerPage from "./Features/Customer/CustomerPage";
import OrderSumary from "./Features/Cart/OrderSumary";
import CheckoutFlow from "./Features/Payment/CheckOutFlow";
import { useAppSelector } from "./app/hooks";
import { selectCurrentRol } from "./Features/Authentication/AuthSlice";
/* import CustomerNavBar from "./components/CustomerNavBar"; */

import AdminCatalog from "./pages/Catalog/AdminCatalog";
import AllocateProducts from "./Features/Warehouse/AllocateProducts";
import CustomerNavBar from "./components/CustomerNavBar";
import AdminNavBar from "./components/AdminNavBar";
import ManagerNavBar from "./components/ManagerNavBar";
/* import AdminNavBar from "./components/AdminNavBar";
import ManagerNavBar from "./components/ManagerNavBar"; */

function App() {
  const role = useAppSelector(selectCurrentRol);
  return (
    <BrowserRouter>
      {role === null && <NavBar />   }
      {role === "CLIENTE" && <CustomerNavBar />}
      {role === "ADMIN"   && <AdminNavBar />}
      {role === "MANAGER" && <ManagerNavBar/>}

      <Routes>
        <Route path="/" element={/* role === null || role == "CONSUMER" ?  */<HomePage /> /* : <Error404/> */} />
        {/* Catálogo */}
        <Route path="products">
          <Route index element={<Catalog />} /> {/* Catálogo general */}
          <Route path=":productId" element={<ProductPage />} />{" "}
          {/* Página de producto individual */}
        </Route>



        {/*Shop  (Emplyee/manager)*/}
        <Route path="/manager/:shopId" element={/* role === "MANAGER" ? */ <ShopPage /> /* : <Error404/> */}>
          {/* Tienda con sus datos */}
          <Route index element={<WarehouseList />} /> {/*Lista de Almacenes  */}
          <Route path="createWarehouse" element={<WarehouseForm />} />
          <Route path="warehouse/:warehouseId" element={<WarehousePage />}>
            {/* Lista de productos del almacen */}
            <Route index element={<WarehouseTable />} />
            <Route path="inventory" element={<AllocateProducts/>} />
          </Route>
          <Route path="products" element={<InventoryGeneralTable />} />
          <Route
            path="products/editProduct/:productId"
            element={<ProductForm />}
          />
          <Route path="products/createProduct" element={<ProductForm />} />
        </Route>

        {/*Shop  (Emplyee/admin)*/}
        {/* http://localhost:5173/admin/warehouse/f1b1b3b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b*/}
        <Route path="/admin/warehouse/:warehouseId" element={/* role === "ADMIN" ? */ <WarehousePage />/*  : <Error404/> */}>
          <Route index element={<WarehouseTable />} />
          <Route path="products" element={<AdminCatalog/>} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="order" element={<OrderSumary />} />
        </Route>

        <Route path="customer" element={ /* role == "CONSUMER" ?  */<CustomerPage />/* : <Error404/> */}>
          <Route index element={<CustomerHistory />} />
          <Route path="customerInfo" element={<CustomerInfo />} />
          <Route path="history" element = {<CustomerHistory/>}/>

          {/* order */}
          <Route path="order" element={<OrderPage />}>
            <Route element={<UserDetailsLayout />}>
              <Route index element={<UserDetails />} />
              <Route path="payment" element={<CheckoutFlow />} />
            </Route>
          </Route>
        </Route>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Error page */}
        {/*  <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
