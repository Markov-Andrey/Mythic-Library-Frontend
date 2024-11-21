<template>
    <div v-if="loading" class="text-lg">Загрузка...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
        <div class="p-5 grid gap-4">
            <div>
                <img :src="item.image_url" alt="Item Image" class="h-[300px] object-cover rounded mb-2" />
                <h2 class="text-lg font-semibold">{{ item.name }}</h2>
                <p class="text-gray-600">{{ item.description }}</p>
                <p><strong>Тип:</strong> {{ item.type }}</p>
                <p><strong>Вес:</strong> {{ item.weight_per_unit }}</p>
                <p><strong>Цена:</strong> {{ item.value }}</p>
                <div v-if="item.has_hidden_properties">
                    <p class="text-sm italic text-gray-500">Скрытые свойства</p>
                </div>
                <div v-else-if="item.properties && Object.keys(item.properties).length" class="mt-2">
                    <h3 class="text-sm font-semibold">Свойства:</h3>
                    <ul class="list-disc text-sm pl-5">
                        <li v-for="(value, key) in item.properties" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                </div>
                <div v-else>
                    <p class="text-sm text-gray-500">Нет дополнительных свойств</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useHead } from "@vueuse/head";
import { apiService } from '~/services/apiService';

useHead({
    title: 'Предметы',
});

const item = ref({});
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const fetchItem = async (id) => {
    const response = await apiService.item(id);
    item.value = response.data;
    loading.value = false;
};

watchEffect(() => {
    if (item.value?.name) {
        useHead({
            title: item.value.name,
        });
    }
});

onMounted(() => {
    const itemId = route.params.id;
    fetchItem(itemId);
});
</script>

<style scoped>
</style>
