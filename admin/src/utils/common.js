import axios from "axios";

export default axios.create({
  
  baseURL: `http://localhost:3200/api`,
  // baseURL: import.meta.env.VITE_BACKEND_URL,
});