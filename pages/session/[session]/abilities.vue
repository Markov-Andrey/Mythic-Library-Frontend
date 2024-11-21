<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Способности</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in locations" :key="item.id" class="border rounded-lg shadow p-4">
                    <img v-if="item.image" :src="item.image" alt="Item Image" class="w-full h-40 object-cover rounded mb-2" />
                    <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                    <p class="text-gray-600">{{ item.description }}</p>
                    <p><strong>Тип:</strong> {{ item.type }}</p>
                    <div v-if="item.parameters && Object.keys(item.parameters).length" class="mt-2">
                        <h3 class="text-sm font-semibold">Свойства:</h3>
                        <ul class="list-disc text-sm pl-5">
                            <li v-for="(value, key) in item.parameters" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import {useHead} from "@vueuse/head";
import { api, request } from '~/services/api';

useHead({
    title: 'Способности',
});

const locations = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const fetchItems = async (id) => {
    loading.value = true;
    error.value = null;
    const postData = { type: null };
    const response = await request(() => api().post(`/api/abilities/${id}`, postData));
    locations.value = response.data;
    loading.value = false;
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchItems(sessionId);
});
</script>
