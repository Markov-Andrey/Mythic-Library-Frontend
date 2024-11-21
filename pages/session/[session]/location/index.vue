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
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import Location from '/components/location.vue';
import {useHead} from "@vueuse/head";
import { apiService } from '~/services/apiService';

useHead({
    title: 'Локации',
});

const locations = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchLocations = async (id) => {
    error.value = null;
    const response = await apiService.locations(id);
    locations.value = response.data;
    loading.value = false;
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchLocations(sessionId);
});
</script>
