import type { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import AuthAxios from "../axios/commonAxios"
import { toast } from "react-toastify";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const setupInterceptors = (instance: AxiosInstance, loginRedirect?: string) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message: string }>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
      if (!originalRequest) return Promise.reject(error);

      if (error.response?.data?.message) {
        console.log(error.response.data.message);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await AuthAxios.post<{ data: string }>("/refreshToken");

          const newAccessToken = refreshResponse.data.data;

          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          if (loginRedirect) {
            window.location.href = loginRedirect;
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
