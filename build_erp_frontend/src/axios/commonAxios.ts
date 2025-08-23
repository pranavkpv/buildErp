import axios from "axios";
import { setupInterceptors } from "../axiosInterceptor/setupInterceptors";

const commonAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

setupInterceptors(commonAxios); 

export default commonAxios;
