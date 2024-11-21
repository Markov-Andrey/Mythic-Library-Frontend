// ~/services/apiService.ts
// @ts-ignore
import { api, request } from '~/services/api';

class ApiService {
    async items(id: string, data: Record<string, any>) {
        return await request(() => api().post(`/api/items/${id}`, data));
    }
    async item(id: string) {
        return await request(() => api().get(`/api/item/${id}`));
    }
    async itemType(id: string) {
        return await request(() => api().get(`/api/items/${id}/types`));
    }
    async characters(id: string, data: Record<string, any>) {
        return await request(() => api().post(`/api/characters/${id}`, data));
    }
    async character(id: string) {
        return await request(() => api().get(`/api/character/${id}`));
    }
    async abilities(id: string, data: Record<string, any>) {
        return await request(() => api().post(`/api/abilities/${id}`, data));
    }
    async session(id: string) {
        return await request(() => api().get(`/api/session/${id}`));
    }
    async sessions() {
        return await request(() => api().get(`/api/sessions`));
    }
    async notes(id: string, data: Record<string, any>) {
        return await request(() => api().post(`/api/notes/${id}`, data));
    }
}

export const apiService = new ApiService();
