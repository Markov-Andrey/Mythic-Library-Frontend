<template>
    <div class="p-4">
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <div class="flex items-center">
                <img v-if="organization.logo_url" :src="organization.logo_url" alt="Organization Logo" class="w-36 h-36 rounded mr-4" />
                <div>
                    <div class="flex gap-2 mt-2 font-bold badge badge-info">
                        {{ organization.type }}
                    </div>
                    <h1 class="text-2xl font-bold">{{ organization.name }}</h1>
                    <p class="text-sm text-gray-500 mt-2">
                        <strong>Статус:</strong> {{ organization.status }}
                    </p>
                </div>
            </div>
            <hr>
            <p class="mt-2" v-html="organization.description"></p>
            <hr>
            <div v-if="organization.parameters">
                <h3 class="text-lg font-semibold">Параметры:</h3>
                <ul class="list-disc pl-5">
                    <li v-for="(value, key) in organization.parameters" :key="key">
                        <strong>{{ key }}:</strong> {{ value }}
                    </li>
                </ul>
            </div>
            <hr>
            <div v-if="currentImage" class="mt-4">
                <img :src="currentImage" alt="Current Organization" class="w-full max-h-[500px] object-contain" />
            </div>
            <div v-if="organization.images_urls.length" class="mt-4">
                <div class="mt-2 flex flex-wrap gap-4">
                    <p v-if="!organization.images_urls.length" class="text-gray-500">No images available.</p>
                    <img v-else
                         v-for="(image, index) in organization.images_urls"
                         :key="index"
                         :src="image"
                         alt="Organization"
                         :class="[
                            'rounded object-cover cursor-pointer',
                            currentImage === image ? 'border-4 border-blue-500' : 'border border-transparent'
                        ]"
                         style="max-height: 100px; width: auto;"
                         @click="changeMainImage(image)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useHead } from "@vueuse/head";

const organization = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();
const currentImage = ref('');

const fetchOrganization = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
        const response = await axios.get(`${config.public.apiBase}/api/organization/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        organization.value = response.data;
        if (organization.value.images_urls) {
            organization.value.images_urls = organization.value.images_urls.map(img => img);
        }
        currentImage.value = organization.value.images_urls[0] || '';
    } catch (err) {
        error.value = 'Ошибка при загрузке данных.';
    } finally {
        loading.value = false;
    }
};

const changeMainImage = (image) => {
    currentImage.value = image;
};

onMounted(() => {
    fetchOrganization(route.params.id);
});

watchEffect(() => {
    if (organization.value?.name) {
        useHead({
            title: organization.value.name,
        });
    }
});
</script>

<style scoped>
</style>
