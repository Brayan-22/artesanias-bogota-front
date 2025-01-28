import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Category } from "../Categories/Category";

export interface Product {
  id: number;
  name: string;
  stock: number;
  description: String;
  price: number;
  category: Category | null
  image:string
}

export interface Inventory {
  id: number;
  name:string
  products: Product[];
}



const initialState: Inventory = {
  id: 0,
  name: "default invnentory",
  //categories: defaultCategories,
  products: [
    {
      id: 1,
      name: "Mochila Wayuu",
      description:
        "Mochila tejida a mano por la comunidad Wayuu, hecha con hilos de algodón y diseños tradicionales.",
      price: 45.0,
      stock: 5,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 2,
      name: "Sombrero Vueltiao",
      description:
        "Sombrero tradicional de la cultura zenú, tejido a mano con caña fleha.",
      price: 60.0,
      stock: 50,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 3,
      name: "Cerámica Tairona",
      description:
        "Figura de cerámica hecha a mano inspirada en las formas de la cultura Tairona.",
      price: 30.0,
      stock: 75,
      category: { id: 1, name: "Cerámica" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 4,
      name: "Cesta Embera",
      description:
        "Cesta tejida a mano por la comunidad Embera, ideal para decoración o almacenamiento.",
      price: 25.0,
      stock: 150,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 5,
      name: "Collares Kogi",
      description:
        "Collares hechos a mano por la comunidad Kogi, elaborados con semillas y piedras naturales.",
      price: 35.0,
      stock: 80,
      category: { id: 4, name: "Joyería artesanal" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 6,
      name: "Tapiz Wayuu",
      description:
        "Tapiz tejido con patrones geométricos, ideal para decoración de paredes.",
      price: 55.0,
      stock: 40,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 7,
      name: "Juguetes de Madera",
      description:
        "Juguetes artesanales elaborados en madera por artesanos locales.",
      price: 20.0,
      stock: 100,
      category: { id: 2, name: "Madera" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 8,
      name: "Pulseras Kuna",
      description: "Pulseras coloridas hechas a mano por la comunidad Kuna.",
      price: 15.0,
      stock: 200,
      category: { id: 4, name: "Joyería artesanal" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 9,
      name: "Café Orgánico",
      description:
        "Café cultivado de manera orgánica en fincas de pequeñas comunidades campesinas.",
      price: 12.0,
      stock: 500,
      category: { id: 6, name: "Cestas y canastos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 10,
      name: "Miel Artesanal",
      description:
        "Miel pura cosechada por apicultores de comunidades rurales.",
      price: 10.0,
      stock: 300,
      category: { id: 6, name: "Cestas y canastos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 11,
      name: "Hamaca Caribeña",
      description:
        "Hamaca tejida a mano con hilos resistentes y colores vivos.",
      price: 70.0,
      stock: 30,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 12,
      name: "Ruana Boyacense",
      description:
        "Ruana tradicional tejida en lana de oveja, perfecta para el frío.",
      price: 80.0,
      stock: 60,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 13,
      name: "Sombrero Aguadeño",
      description:
        "Sombrero hecho a mano en Aguadas, Caldas, tejido con iraca.",
      price: 45.0,
      stock: 90,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 14,
      name: "Bolso de Yute",
      description:
        "Bolso ecológico fabricado en yute, ideal para compras sostenibles.",
      price: 25.0,
      stock: 120,
      category: { id: 4, name: "Joyería artesanal" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 15,
      name: "Vasija de Barro",
      description:
        "Vasija de barro hecha a mano, ideal para decoración o cocina tradicional.",
      price: 20.0,
      stock: 150,
      category: { id: 1, name: "Cerámica" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 16,
      name: "Cuchara de Palo",
      description: "Cuchara tallada en madera, perfecta para cocinar.",
      price: 5.0,
      stock: 300,
      category: { id: 2, name: "Madera" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 17,
      name: "Poncho de Lana",
      description: "Poncho elaborado con lana suave, cómodo y abrigador.",
      price: 65.0,
      stock: 80,
      category: { id: 3, name: "Tejidos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 18,
      name: "Juego de Ajedrez Artesanal",
      description: "Tablero y piezas de ajedrez talladas a mano por artesanos.",
      price: 100.0,
      stock: 20,
      category: { id: 2, name: "Madera" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 19,
      name: "Tapabocas de Tela",
      description: "Tapabocas reutilizable, confeccionado con tela de algodón.",
      price: 8.0,
      stock: 400,
      category: { id: 6, name: "Cestas y canastos" },
      image: "/src/assets/images/product1.jpg"
    },
    {
      id: 20,
      name: "Cartera de Cuero",
      description:
        "Cartera elaborada con cuero auténtico, resistente y elegante.",
      price: 120.0,
      stock: 50,
      category: { id: 4, name: "Joyería artesanal" },
      image: "/src/assets/images/product1.jpg"
    }
  ],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    productCreated: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    productEdited: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const existingItemIndex = state.products.findIndex(
              (p) => p.id === product.id
            );
            if (existingItemIndex !== -1) {
              state.products[existingItemIndex].name = product.name
              state.products[existingItemIndex].stock = product.stock
              state.products[existingItemIndex].description = product.description
              state.products[existingItemIndex].price = product.price
              state.products[existingItemIndex].category = product.category
              state.products[existingItemIndex].image = product.image
            } 
    },
    productDeleted: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id != action.payload
      );
    },

  },
});

export default inventorySlice.reducer;

export const { productCreated,productDeleted, productEdited} = inventorySlice.actions;

export const selectInventory = (state: RootState) => state.inventory;

export const selectAllProducts = (state: RootState) => state.inventory.products;

export const selectInventoryProduct = (state: RootState, productId: number) =>
  state.inventory.products.find((product) => product.id == productId);


export const selectProductsByCategoryId = (state: RootState, categoriesId: number[]) =>
  state.inventory.products.filter(
    product => product.category && categoriesId.includes(product.category.id)
  );

