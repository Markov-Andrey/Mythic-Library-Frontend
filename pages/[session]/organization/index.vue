<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Организации</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <router-link :to="'organization/' + note.id" v-for="note in notes" :key="note.id" class="border rounded-lg shadow p-4 hover:shadow-xl transition">
                    <div class="flex gap-2">
                        <div class="flex justify-center mb-4">
                            <img :src="note.logo_url" alt="Лого" class="w-24 h-24 object-cover rounded">
                        </div>
                        <div>
                            <div class="flex gap-2 mt-2 font-bold badge badge-info">
                                {{ note.type }}
                            </div>
                            <h2 class="text-2xl font-semibold">{{ note.name }}</h2>
                        </div>
                    </div>
                    <p v-if="note.description" class="line-clamp" v-html="note.description"></p>
                    <p class="text-sm text-gray-500 mt-2">
                        <strong>Статус:</strong> {{ note.status }}
                    </p>
                    <p class="text-sm text-gray-500 mt-2">
                        <strong>Создано:</strong> {{ new Date(note.created_at).toLocaleString() }}
                        <br>
                        <strong>Изменено:</strong> {{ new Date(note.updated_at).toLocaleString() }}
                    </p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useHead } from "@vueuse/head";

useHead({
    title: 'Организации',
});

const notes = ref([]);
const types = ref([]);
const selectedTypes = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchNotes = async (id) => {
    error.value = null;
    loading.value = true;
    try {
        const { data } = await axios.post(`${config.public.apiBase}/api/organizations/${id}`, {
            type: selectedTypes.value.join(',')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        notes.value = data;
    } catch (err) {
        error.value = `Ошибка при загрузке даннвыых: ${err.response ? err.response.data.message : err.message}`;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchNotes(sessionId);
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