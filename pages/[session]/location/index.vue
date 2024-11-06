<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Локации</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <ul v-else>
            <li v-for="location in locations" :key="location.id">
                <Location :location="location" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import Location from '/components/location.vue';

const locations = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchLocations = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
        const response = await axios.get(`${config.public.apiBase}/api/locations/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        locations.value = response.data;
    } catch (err) {
        error.value = 'Ошибка при загрузке данных.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchLocations(sessionId);
});
</script>
