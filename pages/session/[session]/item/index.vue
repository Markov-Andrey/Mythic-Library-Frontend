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
                        :to="'item/' + item.id"
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
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import {useHead} from "@vueuse/head";
import { api, request } from '~/services/api';

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
    const postData = { type: selectedTypes.value.join(',') };
    const response = await request(() => api().post(`/api/items/${id}`, postData));
    locations.value = response.data;
    loading.value = false;
};

const fetchTypes = async (id) => {
    error.value = null;
    const response = await request(() => api().get(`/api/items/${id}/types`));
    types.value = response.data;
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
</style>