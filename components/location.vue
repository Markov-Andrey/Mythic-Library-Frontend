<template>
    <router-link :to="`locations/${location.id}`" class="w-full">
        <div class="group transition-all location-content flex items-center w-full p-2 hover:bg-slate-300 rounded">
            <img v-if="location.image" :src="location.image" alt="location image" class="w-10 h-10 mr-2 rounded-full" />
            <div v-else class="w-10 h-10 mr-2 bg-gray-100 rounded-full"></div>
            <div class="flex items-center gap-2">
                <span class="badge badge-info p-2">{{ location.type }}</span>
                <span class="text-2xl font-bold group-hover:text-gray-600">{{ location.name }}</span>
            </div>
        </div>
        <ul v-if="location.children && location.children.length > 0" class="location-children mt-2 pl-10">
            <li v-for="child in location.children" :key="child.id">
                <Location :location="child" />
            </li>
        </ul>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    location: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
</style>
