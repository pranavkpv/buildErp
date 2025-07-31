
import axios, { type AxiosInstance } from 'axios';


export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.BASE_URL, 
      withCredentials: true,
    });


    this.instance.interceptors.response.use(    
      (response) => response,
      async (error) => {
         console.log("haai")
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { data } = await this.instance.post('/refresh-token');
            localStorage.setItem('accessToken', data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  setAuthToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export const apiClient = new ApiClient();