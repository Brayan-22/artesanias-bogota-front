import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Asegúrate de reemplazar con tu URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
