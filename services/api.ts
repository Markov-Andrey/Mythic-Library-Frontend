// @ts-ignore
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// @ts-ignore
import { useRuntimeConfig } from '#app';

const request = async (requestFn: () => Promise<AxiosResponse>) => {
    try {
        return await requestFn();
    } catch (error) {
        // @ts-ignore
        console.error('Ошибка при запросе:', error.response?.data?.message || error.message);
        throw error;
    }
};

const api = (): AxiosInstance => {
    const config = useRuntimeConfig();

    const instance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (request: AxiosRequestConfig): AxiosRequestConfig => {
            const token = localStorage.getItem('auth_token');
            if (token) request.headers.Authorization = `Bearer ${token}`;
            return request;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            console.error('Ошибка API:', error.response?.data?.message || error.message);
            return Promise.reject(error);
        }
    );

    return instance;
};

export { api, request };
