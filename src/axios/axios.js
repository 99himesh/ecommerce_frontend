import axios from "axios";
console.log(import.meta.env.VITE_BASE_URL);


const api = axios.create({
  baseURL: "https://ecommerce-backend-lynx.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  }, 
});

export default api;
