// @ts-ignore
import { useRuntimeConfig } from "#app";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
    };
}

interface LoginCredentials {
    username: string;
    password: string;
}

export const api = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const config = useRuntimeConfig();
        const { data, error } = await useFetch<LoginResponse>(`${config.public.apiBase}/api/login`, {
            method: 'POST',
            // @ts-ignore
            body: credentials,
        });

        if (error.value) {
            console.error('Login failed:', error.value);
            throw new Error('Login failed: ' + error.value.message);
        }

        if (!data.value) {
            console.error('No data received');
            throw new Error('No data received');
        }

        localStorage.setItem('auth_token', data.value.token);
        return data.value;
    },
};
