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
    <nav>
        <div class="flex items-stretch py-2 bg-green-500 xl:px-36 px-5">
            <div class="flex flex-1 items-center">
                <img class="h-8" :src="logo" alt="Vue Jobs">
                <span class="my-3 mx-2 font-bold text-white">BABAR APPOINTMENT</span>
            </div>
            <div class="flex flex-1 my-3 md:mx-4 xl:mx-36  space-x-1 text-white justify-end text-sm">
                <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-green-800' : '', 'hover:bg-gray-800', 'py-2', 'px-2', 'rounded-md']">Home</RouterLink>
                <RouterLink to="/appointment/create" :class="[isActiveLink('/appointment/create') ? 'bg-green-800' : '', 'hover:bg-gray-800', 'py-2', 'px-2', 'rounded-md']">Create Appointment</RouterLink>
                <RouterLink v-if="isAuthenticated" to="/dashboard" :class="[isActiveLink('/dashboard') ? 'bg-green-800' : '', 'hover:bg-gray-800', 'py-2', 'px-2', 'rounded-md']">Dashboard</RouterLink>
                <RouterLink v-if="!isAuthenticated" to="/auth/login" :class="[isActiveLink('/auth/login') ? 'bg-green-800' : '', 'hover:bg-gray-800', 'py-2', 'px-2', 'rounded-md']">Login</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>