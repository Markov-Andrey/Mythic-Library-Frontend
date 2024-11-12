<template>
    <div class="p-5">
        <h1 class="text-3xl font-bold mb-4">Предметы</h1>
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="mb-4 flex gap-2">
                <div v-for="type in types" :key="type">
                    <button
                        @click="toggleType(type)"
                        :class="{
                            'badge badge-outline hover:badge badge-neutral': !selectedTypes.includes(type),
                            'badge badge-neutral': selectedTypes.includes(type)
                        }">
                        {{ type }}
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <div v-for="item in locations" :key="item.id">
                    <router-link
                        :to="'/item/' + item.id"
                        class="flex gap-2 h-full block border border-gray-200 rounded-lg shadow-md p-2 hover:shadow-lg transition"
                    >
                        <img
                            :src="item.image"
                            alt="Item Image"
                            class="w-12 h-12 object-cover rounded"
                        />
                        <div>
                            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                            <p class="text-gray-500">{{ item.type }}</p>
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
import {useHead} from "@vueuse/head";

useHead({
    title: 'Предметы',
});

const locations = ref([]);
const types = ref([]);
const selectedTypes = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const fetchItems = async (id) => {
    error.value = null;
    try {
        const { data } = await axios.post(`${config.public.apiBase}/api/items/${id}`, {
            type: selectedTypes.value.join(','),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        locations.value = data;
    } catch (error) {
        error.value = `Ошибка при загрузке данных: ${error.response ? error.response.data.message : error.message}`;
    } finally {
        loading.value = false;
    }
};

const fetchTypes = async (id) => {
    try {
        const { data } = await axios.get(`${config.public.apiBase}/api/items/${id}/types`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
        });
        types.value = data;
    } catch (error) {
        error.value = `Ошибка при загрузке типов: ${error.response ? error.response.data.message : error.message}`;
    }
};

const toggleType = async (type) => {
    if (selectedTypes.value.includes(type)) {
        selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
    } else {
        selectedTypes.value.push(type);
    }
    await router.replace({
        path: route.path,
        query: {type: selectedTypes.value.length ? selectedTypes.value.join(',') : undefined}
    });

    await fetchItems(route.params.session);
};

onMounted(() => {
    const sessionId = route.params.session;
    fetchTypes(sessionId);
    selectedTypes.value = route.query.type ? route.query.type.split(',') : [];
    fetchItems(sessionId);
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