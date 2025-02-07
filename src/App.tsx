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
import Payment from "./Features/Cart/Payment";
import UserDetailsLayout from "./Features/Cart/UserDetailsLayout";
import UserDetails from "./Features/Cart/UserDetails";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CustomerHistory from "./Features/Customer/CustomerHistory";
import CustomerInfo from "./Features/Customer/CustomerInfo";
import CustomerPage from "./Features/Customer/CustomerPage";
import CustomerNavBar from "./components/CustomerNavBar";
import AdminNavBar from "./components/AdminNavBar";
import TestNavbar from "./components/TestNavbar";
import { selectCurretTestMode } from "./Features/Authentication/AuthSlice";
import { useAppSelector } from "./app/hooks";
import ManagerNavBar from "./components/ManagerNavBar";

function App() {
  const testMode = useAppSelector(selectCurretTestMode);
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      {/* <CustomerNavBar/> */}
      <TestNavbar />
      {testMode.mode == "guest" && (
        <>
          <NavBar />
          {/* <Navigate to="/" />{" "} */}
        </>
      )}
      {testMode.mode == "customer" && <CustomerNavBar />}
      {testMode.mode == "admin" && (
        <>
          <AdminNavBar />
        </>
      )}
      {testMode.mode == "manager" && (
        <>
          <ManagerNavBar />
        </>
      )}

      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />
        {/* Catálogo */}
        <Route path="products">
          <Route index element={<Catalog />} /> {/* Catálogo general */}
          <Route path=":productId" element={<ProductPage />} />{" "}
          {/* Página de producto individual */}
        </Route>

        <Route path="order" element={<OrderPage />}>
          <Route element={<UserDetailsLayout />}>
            <Route index element={<UserDetails />} />
          </Route>
        </Route>

        {/*Shop  (Emplyee/manager)*/}
        <Route path="/manager/:shopId" element={<ShopPage />}>
          {/* Tienda con sus datos */}
          <Route index element={<WarehouseList />} /> {/*Lista de Almacenes  */}
          <Route path="createWarehouse" element={<WarehouseForm />} />
          <Route path="warehouse/:warehouseId" element={<WarehousePage />}>
            {/* Lista de productos del almacen */}
            <Route index element={<WarehouseTable />} />
            <Route path="inventory" element={<h1>Opciones</h1>} />
          </Route>
          <Route path="products" element={<InventoryGeneralTable />} />
          <Route
            path="products/editProduct/:productId"
            element={<ProductForm />}
          />
          <Route path="products/createProduct" element={<ProductForm />} />
        </Route>

        {/*Shop  (Emplyee/admin)*/}
        <Route path="/admin/warehouse/:warehouseId/inventory" element={<WarehousePage />}>
          <Route index element={<WarehouseTable />} />
          <Route path="inventory" element={<h1>Opciones</h1>} />
         {/*  <Route path="products" element={<InventoryGeneralTable />} /> */}
         
        </Route>

        <Route path="customer/:customerId" element={<CustomerPage />}>
          <Route index element={<CustomerHistory />} />
          <Route path="customerInfo" element={<CustomerInfo />} />
          {/* order */}
          <Route path="order" element={<OrderPage />}>
            <Route element={<UserDetailsLayout />}>
              <Route index element={<UserDetails />} />
              <Route path="payment" element={<Payment />} />
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
