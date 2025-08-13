import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AuthAxios from './authAxios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_SITEMANAGER_URL,
    withCredentials: true
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry: boolean
}

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken")
        if (token && config.headers) {
            config.headers.authorization = `Bearer ${ token }`
        }
        return config
    }
)

instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = await AuthAxios.post<{ data: string }>('/refreshToken')
                const newAccessToken = refreshToken.data.data
                localStorage.setItem('accessToken', newAccessToken)
                originalRequest.headers = {
                    ...originalRequest.headers, Authorization: `Bearer ${ newAccessToken }`
                }
                return instance(originalRequest)
            } catch (refreshError) {
                window.location.href = '/login';
                console.log('error while handling refresh token in the vendor side', refreshError)
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)


export default instance