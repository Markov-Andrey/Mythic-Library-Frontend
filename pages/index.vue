<template>
    <div class="flex flex-col items-center justify-center mt-10">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">Добро пожаловать в Mythic Library</h1>
        <p class="text-lg text-gray-700 mb-8 text-center">
            Здесь вы найдете все необходимые ресурсы для изучения и развития.
            Присоединяйтесь к нам и откройте новые горизонты!
        </p>

        <div class="text-2xl font-bold">Мои игровые сессии</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div v-for="session in sessions" :key="session.id">
                <router-link :to="`/session/${session.id}`" class="block border rounded-lg shadow-md p-4 hover:shadow-xl transition">
                    <img :src="session.preview" alt="Session Preview" class="w-full h-48 object-cover rounded-md" />
                    <h2 class="text-lg font-semibold mt-2">{{ session.name }}</h2>
                    <p class="text-gray-600">{{ session.description }}</p>
                </router-link>
            </div>
        </div>

        <div v-if="sessions.length === 0">
            <p class="mt-4 text-gray-600">Сессий не найдено.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useHead} from "@vueuse/head";

useHead({
    title: 'Главная',
});

const sessions = ref([]);

const fetchSessions = async () => {
    console.log("Fetching sessions...");
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('No auth token found');
        }

        const config = useRuntimeConfig();

        const response = await axios.get(`${config.public.apiBase}/api/sessions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        sessions.value = response.data;

        console.log("Sessions fetched:", sessions.value);
    } catch (error) {
        console.error('Ошибка при получении сессий:', error.message);
    }
};

onMounted(() => {
    fetchSessions();
});
</script>

<style scoped>
</style>
