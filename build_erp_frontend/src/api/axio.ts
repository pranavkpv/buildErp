import axios from "axios";

const axioInstance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
})

export default axioInstance