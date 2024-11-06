<template>
    <div class="mx-auto p-4" v-if="session">
        <div class="mb-4">
            <img :src="session?.preview" alt="Session Preview" class="w-full h-48 object-cover rounded-md" />
        </div>
        <h1 class="text-3xl font-bold mb-4">{{ session?.name }}</h1>
        <p class="text-lg text-gray-700 mb-4">{{ session?.description }}</p>

        <h2 class="text-xl font-semibold mb-2">Участники:</h2>
        <ul class="list-disc list-inside mb-4">
            <li v-for="user in session?.session_users" :key="user.id" class="text-gray-600">
                ID: {{ user.user_id }}
            </li>
        </ul>

        <h2 class="text-2xl font-semibold mb-4">Данные:</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <router-link
                v-for="link in links"
                :key="link.name"
                :to="`/${session.id}/${link.path}`"
                class="block p-4 border rounded-lg shadow-md bg-white hover:bg-blue-100 transition"
            >
                <h3 class="text-lg font-bold text-blue-600">{{ link.name }}</h3>
            </router-link>
        </div>
    </div>
    <div v-else>
        <p class="mt-4 text-gray-600">Загрузка данных сессии...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

const session = ref(null);
const route = useRoute();

const links = [
    { name: 'Локации', path: 'location' },
    { name: 'Предметы', path: 'items' },
    { name: 'Персонажи', path: 'character' },
    { name: 'Способности', path: 'abilities' }
];

const fetchSession = async (id) => {
    const token = localStorage.getItem('auth_token');
    const config = useRuntimeConfig();

    try {
        const response = await axios.get(`${config.public.apiBase}/api/session/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        session.value = response.data.original;
    } catch (error) {
        console.error('Ошибка при получении сессии:', error.message);
    }
};

onMounted(() => {
    const id = route.params.session;
    fetchSession(id);
});
</script>

<style scoped>
</style>
