<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Заметки</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <router-link :to="'note/' + note.id" v-for="note in notes" :key="note.id" class="border rounded-lg shadow p-4 hover:shadow-xl transition">
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
                        <hr><p class="line-clamp" v-html="note.content"></p><hr>
                        <p class="text-sm text-gray-500">
                            <strong>Создано:</strong> {{ new Date(note.created_at).toLocaleString() }}
                            <strong>Изменено:</strong> {{ new Date(note.updated_at).toLocaleString() }}
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
    title: 'Заметки',
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
    const data = { type: selectedTypes.value.join(',') };
    const response = await apiService.notes(id, data);
    notes.value = response.data;
    loading.value = false;
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