<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Предметы</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in locations" :key="item.id" class="border rounded-lg shadow p-4">
                    <img :src="getImageUrl(item.image)" alt="Item Image" class="w-full h-40 object-cover rounded mb-2" />
                    <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                    <p class="text-gray-600">{{ item.description }}</p>
                    <p class="mt-2"><strong>Тип:</strong> {{ item.type }}</p>
                    <p class="mt-1"><strong>Вес:</strong> {{ item.weight_per_unit }}</p>
                    <p class="mt-1"><strong>Цена:</strong> {{ item.value }}</p>
                    <div v-if="item.properties && Object.keys(item.properties).length" class="mt-2">
                        <h3 class="text-sm font-semibold">Свойства:</h3>
                        <ul class="list-disc text-sm pl-5">
                            <li v-for="(value, key) in item.properties" :key="key">
                                <strong>{{ key }}:</strong> {{ value }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

const locations = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchLocations = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
        const response = await axios.get(`${config.public.apiBase}/api/items/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        locations.value = response.data;
    } catch (err) {
        error.value = 'Ошибка при загрузке данных.';
    } finally {
        loading.value = false;
    }
};

const getImageUrl = (imageName) => {
    return `${config.public.apiBase}/storage/items/${imageName}`;
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchLocations(sessionId);
});
</script>
