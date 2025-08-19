import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
})

instance.interceptors.response.use(
   (response) => response,
   (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong");
      return Promise.reject(error);
   }
);

export default instance