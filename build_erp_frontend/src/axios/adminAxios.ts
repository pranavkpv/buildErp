import axios from "axios";
import { setupInterceptors } from "../axiosInterceptor/setupInterceptors"

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
  withCredentials: true,
});

setupInterceptors(adminAxios, "/admin/login");

export default adminAxios;
