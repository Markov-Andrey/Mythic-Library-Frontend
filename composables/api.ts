// composables/api.ts
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
        const { data, error } = await useFetch<LoginResponse>('/api/login', {
            method: 'POST',
            // @ts-ignore
            body: credentials,
        });

        if (error.value) {
            throw new Error('Login failed: ' + error.value.message);
        }

        return data.value;
    },
};
