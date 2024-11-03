<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-zinc-700 to-zinc-900">
        <h1 class="text-5xl mb-8 text-orange-400 z-10 font-bold italic">
            Mythic Library
        </h1>

        <form @submit.prevent="handleSubmit" class="bg-zinc-900 p-6 rounded-lg shadow-md w-96">
            <h2 class="text-xl font-semibold mb-4 text-primary">Вход/Регистрация</h2>

            <div class="mb-4">
                <label for="username" class="block text-sm font-medium text-gray-700">Имя пользователя</label>
                <input type="text" id="username" v-model="username" required class="input input-bordered w-full" placeholder="Введите имя пользователя" />
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
                <input type="password" id="password" v-model="password" required class="input input-bordered w-full" placeholder="Введите пароль" />
            </div>

            <button type="submit" class="btn btn-teal w-full">Войти</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '~/composables/api';

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    try {
        const response = await api.login({ username: username.value, password: password.value });
        console.log('Login successful:', response);
    } catch (error) {
        console.error('Login failed:', error.message);
    } finally {
        username.value = '';
        password.value = '';
    }
};
</script>

<style scoped>
</style>
