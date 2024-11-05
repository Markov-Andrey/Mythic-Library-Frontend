// @ts-ignore
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to: { path: string; }) => {
    const token = localStorage.getItem('auth_token');
    if (!token && to.path !== '/login') return navigateTo('/login');
});