// @ts-ignore
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// @ts-ignore
import { useRuntimeConfig } from '#app';

const request = async (
    requestFn: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
    try {
        return await requestFn();
    } catch (error) {
        // @ts-ignore
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
};

const api = (useToken: boolean = false): AxiosInstance => {
    const config = useRuntimeConfig();

    const instance = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (request: AxiosRequestConfig): AxiosRequestConfig => {
            const authToken = localStorage.getItem('auth_token');
            if (useToken && authToken) {
                request.headers.Authorization = `Bearer ${authToken}`;
            }
            return request;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            console.error(error.response?.data?.message || error.message);
            return Promise.reject(error);
        }
    );

    return instance;
};

export { api, request };