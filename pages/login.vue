<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <h1 class="text-5xl mb-8 text-blue-600 z-10 font-bold italic">
            Mythic Library
        </h1>

        <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Вход/Регистрация</h2>

            <div class="mb-4">
                <label for="username" class="block text-sm font-medium text-blue-600">Имя пользователя</label>
                <input type="text" id="username" v-model="name" required class="input input-bordered w-full border-gray-300" placeholder="Введите имя пользователя" />
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-blue-600">Пароль</label>
                <input type="password" id="password" v-model="password" required class="input input-bordered w-full border-gray-300" placeholder="Введите пароль" />
            </div>

            <button type="submit" class="btn btn-blue-500 w-full text-white bg-blue-500 hover:bg-blue-600">
                Войти
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '~/composables/api';
import {useRouter} from "vue-router";
import {useHead} from "@vueuse/head";

const name = ref('');
const password = ref('');
const router = useRouter();

useHead({
    title: 'Логин',
});

const handleSubmit = async () => {
    try {
        const response = await api.login({ name: name.value, password: password.value });
        console.log('Login successful:', response);
        await router.push('/');
    } catch (error) {
        console.error('Login failed:', error.message);
    } finally {
        name.value = '';
        password.value = '';
    }
};
</script>

<style scoped>
</style>
