import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("API Error: No response received");
      return Promise.reject({ message: "No response from server" });
    } else {
      console.error("API Error:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export const createProduct = (productData) =>
  API.post("/products", productData);
export const getProducts = (searchQuery = "") =>
  API.get(`/products?search=${searchQuery}`);

export const getProductById = (id) => API.get(`/products/${id}`);
