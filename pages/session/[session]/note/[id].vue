<template>
    <div class="p-4">
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="flex gap-2 mt-2">
                <button v-for="type in note.type" :key="type" class="badge badge-outline hover:badge badge-neutral">
                    {{ type }}
                </button>
            </div>

            <h2 class="text-lg font-semibold">{{ note.title }}</h2>

            <p v-if="note.game_time_data">
                <strong>Игровое время:</strong>
                {{ note.game_time_data.year }}.{{ note.game_time_data.month }}.{{ note.game_time_data.day }}
                {{ note.game_time_data.hour }}:{{ note.game_time_data.minute }}
            </p>

            <hr>
            <p v-html="note.content"></p>
            <hr>

            <p class="text-sm text-gray-500">
                <strong>Создано:</strong> {{ new Date(note.created_at).toLocaleString() }}
                <strong>Изменено:</strong> {{ new Date(note.updated_at).toLocaleString() }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

const note = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();

const fetchNote = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
        const response = await axios.get(`${config.public.apiBase}/api/note/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        note.value = response.data;
    } catch (err) {
        error.value = 'Ошибка при загрузке данных.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    const noteId = route.params.id;
    fetchNote(noteId);
});
</script>

<style scoped>
</style>
