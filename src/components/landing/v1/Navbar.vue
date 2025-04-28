<script setup>
import logo from '@/assets/img/logo-1.png';
import { RouterLink, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();

const isActiveLink = (routePath) => {
    return route.path === routePath;
}

const isAuthenticated = ref(false);

onMounted(() => {
    var token = localStorage.getItem('access');

    if(token){
        isAuthenticated.value = true;
    }
});
</script>

<template>
    <nav class="w-full flex items-center justify-center">
        <div class="flex items-stretch py-2 xl:w-9/12 px-5">
            <div class="flex flex-1 items-center">
                <img class="h-10" :src="logo" alt="Vue Jobs">
            </div>
            <div class="flex flex-1 my-3 md:mx-4 xl:mx-36  space-x-1 text-white justify-end text-sm">
                <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-blue-200' : '', 'hover:bg-gray-200', 'py-2', 'px-2', 'rounded-md', 'text-black']">Home</RouterLink>
                <RouterLink to="/appointment/create" :class="[isActiveLink('/appointment/create') || isActiveLink('/appointment/pay') ? 'bg-blue-200' : '', 'hover:bg-gray-200', 'py-2', 'px-2', 'rounded-md', 'text-black']">Create Appointment</RouterLink>
                <RouterLink v-if="isAuthenticated" to="/dashboard" :class="[isActiveLink('/dashboard') ? 'bg-blue-200' : '', 'hover:bg-gray-200', 'py-2', 'px-2', 'rounded-md', 'text-black']">Dashboard</RouterLink>
                <RouterLink v-if="!isAuthenticated" to="/auth/login" :class="[isActiveLink('/auth/login') ? 'bg-blue-200' : '', 'hover:bg-gray-200', 'py-2', 'px-2', 'rounded-md', 'text-black']">Login</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>