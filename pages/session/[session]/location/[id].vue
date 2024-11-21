<template>
    <div class="p-4">
        <div v-if="loading" class="text-lg">Загрузка...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else>
            <h1 class="text-2xl font-bold">{{ location.name }}</h1>
            <h2 class="text-lg text-gray-600">{{ location.type }}</h2>
            <p class="mt-2">{{ location.description }}</p>

            <div v-if="location.attributes && Object.keys(location.attributes).length" class="mt-4">
                <h3 class="text-lg font-semibold">Атрибуты:</h3>
                <ul class="list-disc pl-5">
                    <li v-for="(value, key) in location.attributes" :key="key">
                        <strong>{{ key }}:</strong> {{ value }}
                    </li>
                </ul>
            </div>

            <div class="mt-4">
                <img v-if="location.images.length"
                    :src="currentImage"
                    alt="Location Image"
                    class="rounded object-cover"
                    style="max-height: 300px; width: auto;"
                />
            </div>

            <div class="mt-4 flex flex-wrap gap-4">
                <p v-if="!location.images.length" class="text-gray-500">No images available.</p>
                <img v-else
                    v-for="(image, index) in location.images"
                    :key="index"
                    :src="image"
                    alt="Location"
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { apiService } from '~/services/apiService';

const location = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const config = useRuntimeConfig();
const currentImage = ref('');

const fetchLocation = async (id) => {
    const response = await apiService.location(id);
    location.value = response.data;
    currentImage.value = location.value.images[0] || '';
    loading.value = false;
};

const changeMainImage = (image) => {
    currentImage.value = image;
};

onMounted(() => {
    const locationId = route.params.id;
    fetchLocation(locationId);
});

watchEffect(() => {
    if (location.value?.name) {
        useHead({
            title: location.value.name,
        });
    }
});
</script>

<style scoped>
</style>
