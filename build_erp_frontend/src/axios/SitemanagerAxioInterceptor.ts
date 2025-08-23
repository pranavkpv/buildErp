import axios from "axios";
import { setupInterceptors } from "../axiosInterceptor/setupInterceptors";

const siteManagerAxios = axios.create({
  baseURL: import.meta.env.VITE_SITEMANAGER_URL,
  withCredentials: true,
});

setupInterceptors(siteManagerAxios, "/sitemanager/login");

export default siteManagerAxios;
