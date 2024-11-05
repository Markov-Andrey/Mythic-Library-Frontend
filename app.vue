<template>
    <NuxtPage />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) router.push('/login');
});
</script>

<style scoped>
</style>
