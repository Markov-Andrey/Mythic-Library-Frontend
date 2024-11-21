<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Организации</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <router-link :to="'organization/' + organization.id" v-for="organization in organizations" :key="organization.id" class="border rounded-lg shadow p-4 hover:shadow-xl transition">
                    <div class="flex gap-2">
                        <div class="flex justify-center mb-4">
                            <img :src="organization.logo_url" alt="Лого" class="w-24 h-24 object-cover rounded">
                        </div>
                        <div>
                            <div class="flex gap-2 mt-2 font-bold badge badge-info">
                                {{ organization.type }}
                            </div>
                            <h2 class="text-2xl font-semibold">{{ organization.name }}</h2>
                        </div>
                    </div>
                    <p v-if="organization.description" class="line-clamp" v-html="organization.description"></p>
                    <p class="text-sm text-gray-500 mt-2">
                        <strong>Статус:</strong> {{ organization.status }}
                    </p>
                    <p class="text-sm text-gray-500 mt-2">
                        <strong>Создано:</strong> {{ new Date(organization.created_at).toLocaleString() }}
                        <br>
                        <strong>Изменено:</strong> {{ new Date(organization.updated_at).toLocaleString() }}
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useHead } from "@vueuse/head";
import { apiService } from '~/services/apiService';

useHead({
    title: 'Организации',
});

const organizations = ref([]);
const types = ref([]);
const selectedTypes = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchOrganization = async (id) => {
    error.value = null;
    const data = { type: selectedTypes.value.join(',') };
    const response = await apiService.organizations(id, data);
    organizations.value = response.data;
    loading.value = false;
};

onMounted(() => {
    fetchOrganization(route.params.session);
});
</script>

<style>
.line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>