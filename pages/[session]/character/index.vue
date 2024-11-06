<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Персонажи</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in characters" :key="item.id" class="border rounded-lg shadow p-4 hover:shadow-xl transition">
                    <router-link :to="'character/' + item.id">
                        <img v-if="item.avatar" :src="getImageUrl(item.avatar)" alt="Char" class="w-full h-50 object-cover rounded mb-2" />
                        <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                        <p class="text-gray-600">{{ item.info }}</p>
                        <p><strong>Здоровье:</strong> {{ item.health }}/{{ item.max_health }}</p>
                        <p><strong>Опыт:</strong> {{ item.experience }}</p>
                        <div v-if="item.attributes && Object.keys(item.attributes).length" class="mt-2">
                            <h3 class="text-sm font-semibold">Параметры:</h3>
                            <ul class="list-disc text-sm pl-5">
                                <li v-for="(value, key) in item.attributes" :key="key">{{ key }}: {{ value }}</li>
                            </ul>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';

const characters = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const fetchItems = async (id) => {
    error.value = null;
    try {
        const { data } = await axios.post(`${config.public.apiBase}/api/characters/${id}`, {
            type: null,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        characters.value = data;
    } catch (error) {
        error.value = `Ошибка при загрузке данных: ${error.response ? error.response.data.message : error.message}`;
    } finally {
        loading.value = false;
    }
};

const getImageUrl = (imageName) => `${config.public.apiBase}/storage/avatars/${imageName}`;

onMounted(() => {
    const sessionId = route.params.session;
    fetchItems(sessionId);
});
</script>
