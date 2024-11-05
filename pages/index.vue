<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">Добро пожаловать в Mythic Library</h1>
        <p class="text-lg text-gray-700 mb-8 text-center">
            Здесь вы найдете все необходимые ресурсы для изучения и развития.
            Присоединяйтесь к нам и откройте новые горизонты!
        </p>
        <button @click="handleClick" class="btn bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Узнать больше
        </button>
    </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';

useHead({
    title: 'Добро пожаловать',
});

const handleClick = () => {
    alert("Скоро здесь будет больше информации!");
};
</script>

<style scoped>
</style>
