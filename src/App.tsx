import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Catalog from "./pages/Catalog/Catalog";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar";
import ProductPage from "./pages/Catalog/ProductPage/ProductPage";
import ProductForm from "./Features/Inventory/ProductForm";
import LoginPage from "./pages/LoginPage/LoginPage";
import InventoryPage from "./Features/Inventory/InventoryPage";
import CategoriesPage from "./Features/Categories/CategoriesPage";

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
          <Route path=":productId" element={<ProductPage />} /> {/* Página de producto individual */}
        </Route>

        {/* Inventario */}
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/createProduct" element={<ProductForm />} />
        <Route path="/inventory/editProduct/:id" element={<ProductForm />} />
        {/* Categorías */}
        <Route path="/categories" element={<CategoriesPage/>} /> {/*Crear categoryía*/}
        <Route path="/categories/:id" element={<CategoriesPage/>} />{/*Editar y eliminar categoría  */}
        <Route path="/categories" element={<CategoriesPage/>} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
