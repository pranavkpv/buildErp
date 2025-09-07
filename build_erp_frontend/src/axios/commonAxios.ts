import axios from "axios";
import { setupInterceptors } from "../axiosInterceptor/setupInterceptors";

let baseURL = import.meta.env.VITE_BASE_URL

if (window.location.hostname.includes('devtunnels.ms')) {
  console.log('hello its tunnel');
  baseURL = 'https://93f4stm6-3000.inc1.devtunnels.ms/';
}


const commonAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

setupInterceptors(commonAxios); 

export default commonAxios;
