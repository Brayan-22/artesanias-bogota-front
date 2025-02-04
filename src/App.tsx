import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Catalog from "./pages/Catalog/Catalog";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar";
import ProductPage from "./pages/Catalog/ProductPage/ProductPage";
import ProductForm from "./Features/Product/ProductForm";
import LoginPage from "./pages/LoginPage/LoginPage";
import CategoriesPage from "./Features/Categories/CategoriesPage";
import WarehousePage from "./Features/Warehouse/WarehousePage";
import InventoryGeneralTable from "./Features/Product/InventoryGeneralTable";
import InventoryPage from "./Features/Product/InventoryPage";
import WarehousesList from "./Features/Warehouse/WarehousesList";
import WarehouseTable from "./Features/Warehouse/WarehouseTable";
import WarehouseList from "./Features/Warehouse/WarehousesList";
import WarehouseForm from "./Features/Warehouse/WarehouseForm";
import ShopsList from "./Features/Shops/ShopsList";
import ShopPage from "./Features/Shops/ShopPage";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />
        {/* Catálogo */}
        <Route path="products">
          <Route index element={<Catalog />} /> {/* Catálogo general */}
          <Route path=":productId" element={<ProductPage />} />{" "}
          {/* Página de producto individual */}
        </Route>

        {/*Shop  (Employee/Admin)*/}
        <Route path="/shops/:shopId" element={<ShopPage />}>
          <Route index element={<WarehouseList />} />
          <Route path="createWarehouse" element={<WarehouseForm />} />
          <Route path="warehouse/:warehouseId" element={<WarehousePage />}>
            <Route index element={<WarehouseTable />} />
            <Route path="products" element={<WarehouseTable />} />
            <Route path="products/createProduct" element={<ProductForm />} />
            <Route
              path="products/editProduct/:productId"
              element={<ProductForm />}
            />
          </Route>
        </Route>

        {/* Inventory and categories*/}
        <Route path="/managerInventory" element={<InventoryPage />}>
          <Route index element={<InventoryGeneralTable />} />
          <Route path="shops" element={<ShopsList />} />
          <Route path="shops/:shopId" element={<ShopPage />}>
            <Route index element={<WarehouseList />} />
            <Route path="createWarehouse" element={<WarehouseForm />} />
            <Route path="warehouse/:warehouseId" element={<WarehousePage />}>
              <Route index element={<WarehouseTable />} />
              <Route path="products" element={<WarehouseTable />} />
              <Route path="products/createProduct" element={<ProductForm />} />
              <Route
                path="products/editProduct/:productId"
                element={<ProductForm />}
              />
            </Route>
          </Route>
          <Route path="shops/editShop/:shopId" element={<ShopPage />} />
          <Route path="warehouses" element={<WarehousesList />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:categoryId" element={<CategoriesPage />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Error page */}
        {/*  <Route path="*" element={<Navigate to="/" replace />} /> */}
    

      </Routes>
    </BrowserRouter>
  );
}

export default App;
