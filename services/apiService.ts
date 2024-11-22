// @ts-ignore
import { api, request } from '~/services/api';

class ApiService {
    private withToken: boolean = true;

    async items(id: string, data: Record<string, any>) {
        return request(() => api(this.withToken).post(`/api/items/${id}`, data));
    }
    async item(id: string) {
        return request(() => api(this.withToken).get(`/api/item/${id}`));
    }
    async itemType(id: string) {
        return request(() => api(this.withToken).get(`/api/items/${id}/types`));
    }

    async characters(id: string, data: Record<string, any>) {
        return request(() => api(this.withToken).post(`/api/characters/${id}`, data));
    }
    async character(id: string) {
        return request(() => api(this.withToken).get(`/api/character/${id}`));
    }

    async abilities(id: string, data: Record<string, any>) {
        return request(() => api(this.withToken).post(`/api/abilities/${id}`, data));
    }

    async sessions() {
        return request(() => api(this.withToken).get(`/api/sessions`));
    }
    async session(id: string) {
        return request(() => api(this.withToken).get(`/api/session/${id}`));
    }

    async notes(id: string, data: Record<string, any>) {
        return request(() => api(this.withToken).post(`/api/notes/${id}`, data));
    }
    async note(id: string) {
        return request(() => api(this.withToken).get(`/api/note/${id}`));
    }

    async locations(id: string) {
        return request(() => api(this.withToken).get(`/api/locations/${id}`));
    }
    async location(id: string) {
        return request(() => api(this.withToken).get(`/api/location/${id}`));
    }

    async organizations(id: string, data: Record<string, any>) {
        return request(() => api(this.withToken).post(`/api/organizations/${id}`, data));
    }
    async organization(id: string) {
        return request(() => api(this.withToken).get(`/api/organization/${id}`));
    }
    async login(data: Record<string, any>) {
        return request(() => api().post(`/login`, data));
    }
}

export const apiService = new ApiService();
