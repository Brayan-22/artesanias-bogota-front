import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ProductForm from "./Features/Inventory/ProductForm";
import { NavBar } from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";
import Catalog from "./pages/Catalog/Catalog";
import { InventoryPage } from "./Features/Inventory/InventoryPage";
import { ProductPage } from "./pages/Catalog/ProductPage";
import { LoginPage } from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";

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

        {/* Inventario (rutas protegidas) */}
        <Route path="inventory">
          {/* Página principal del inventario */}
          <Route index element={<InventoryPage />} />
          {/* Edición de producto */}
          <Route path="editProduct/:id" element={<ProductForm />} />
        </Route>

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
