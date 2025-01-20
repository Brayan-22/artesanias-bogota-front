import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import InventoryPage from "./Features/Inventory/InventoryPage";
import ProductForm from "./Features/Inventory/ProductForm";
import { NavBar } from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";
import Catalog from "./pages/Catalog/Catalog";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />
        {/* Página de catálogo */}
        <Route path="/products" element={<Catalog />} />
        {/* Inventario */}
        <Route path="/inventory" element={<InventoryPage />}/>
         <Route path="editProduct/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
