import axios from "axios";
import { setupInterceptors } from "../axiosInterceptor/setupInterceptors";

const userAxios = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  withCredentials: true,
});

setupInterceptors(userAxios, "/login");

export default userAxios;
