// ~/services/apiService.ts
// @ts-ignore
import { api, request } from '~/services/api';

class ApiService {
    async items(id: string, data: Record<string, any>) { return request(() => api().post(`/api/items/${id}`, data)); }
    async item(id: string) { return request(() => api().get(`/api/item/${id}`)); }
    async itemType(id: string) { return request(() => api().get(`/api/items/${id}/types`)); }

    async characters(id: string, data: Record<string, any>) { return request(() => api().post(`/api/characters/${id}`, data)); }
    async character(id: string) { return request(() => api().get(`/api/character/${id}`)); }

    async abilities(id: string, data: Record<string, any>) { return request(() => api().post(`/api/abilities/${id}`, data)); }

    async sessions() { return request(() => api().get(`/api/sessions`)); }
    async session(id: string) { return request(() => api().get(`/api/session/${id}`)); }

    async notes(id: string, data: Record<string, any>) { return request(() => api().post(`/api/notes/${id}`, data)); }
    async note(id: string) { return request(() => api().get(`/api/note/${id}`)); }

    async locations(id: string) { return request(() => api().get(`/api/locations/${id}`)); }
    async location(id: string) { return request(() => api().get(`/api/location/${id}`)); }

    async organizations(id: string, data: Record<string, any>) { return request(() => api().post(`/api/organizations/${id}`, data)); }
    async organization(id: string) { return request(() => api().get(`/api/organization/${id}`)); }
}

export const apiService = new ApiService();
