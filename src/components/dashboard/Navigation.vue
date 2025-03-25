<script setup>
import { ref } from 'vue';
import notificationIcon from '@/assets/img/notification.png';
import logo from '@/assets/img/logo-1.png';
import profile from '@/assets/img/profile.png';
import { useRoute, RouterLink } from 'vue-router';
import LogoutDialog from '@/components/dashboard/dialogs/LogoutDialog.vue';

const route = useRoute();

const isActiveLink = (routePath) => {
    return route.path === routePath;
}

const sidebarNavs = [
    {
        title: 'Dashboard',
        to: '/dashboard'
    },
    {
        title: 'Manage Patients',
        to: '/dashboard/manage-patients'
    }
];

const searchbar = ref('');

</script>

<template>
    <section>
        <div class="flex">
            <div class="shrink-0 flex flex-col w-56 bg-sidebar h-screen">
                <img class="py-8 px-10" :src="logo" alt="BAS logo">
                
                <div class="flex flex-col flex-1">
                    <div class="flex" v-for="nav in sidebarNavs" :key="nav">
                        <RouterLink class="w-full" :to="nav.to">
                            <div class="flex">
                                <div v-if="isActiveLink(nav.to)" class="w-2 mr-4 bg-dashboard-selected rounded-lg">&nbsp;</div>
                                <div :class="['flex', 'items-center', 'justify-center', isActiveLink(nav.to) ? 'bg-dashboard-selected' : '', 'py-4', 'px-8', 'rounded-lg']">
                                    <i class="pi pi-clock text-white pr-4"></i>
                                    <p class="text-white text-sm">{{ nav.title }}</p>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div class="flex flex-col py-10">
                    <RouterLink class="w-full" to="/dashboard/settings">
                        <div class="flex">
                            <div v-if="isActiveLink('/dashboard/settings')" class="w-2 mr-4 bg-dashboard-selected rounded-lg">&nbsp;</div>
                            <div :class="['flex', 'items-center', 'justify-center', isActiveLink('/dashboard/settings') ? 'bg-dashboard-selected' : '', 'py-4', 'px-8', 'rounded-lg']">
                                <i class="pi pi-clock text-white pr-4"></i>
                                <p class="text-white text-sm">Settings</p>
                            </div>
                        </div>
                    </RouterLink>
                    <LogoutDialog></LogoutDialog>
                    <!-- <div class="flex">
                        <div @click="logout" :class="['flex', 'items-center', 'justify-center',  '', 'py-4', 'px-8', 'rounded-lg', 'cursor-pointer']">
                            <i class="pi pi-clock text-white pr-4"></i>
                            <p class="text-white text-sm">Logout</p>
                        </div>
                    </div> -->
                </div>   
            </div>
            <div class="flex flex-1 flex-col">
                <div class="flex w-full py-6 px-10">
                    <!-- searchbar -->
                    <div class="flex flex-1 justify-start items-center relative">
                        <input v-model="searchbar" class="w-96 border-2 border-gray-400 px-10 py-1 rounded-full" type="text">
                        <i class="cursor-pointer absolute ml-3 pi pi-search" :class="searchbar ? 'text-black' : 'text-gray-300'"></i>
                        <p v-if="!searchbar" class="absolute ml-10 text-gray-300">Search...</p>
                    </div>
                    <!-- notification and profile -->
                    <div class="flex items-center justify-center">  
                        <img class="h-6 w-6 mr-6" :src="notificationIcon" alt="">
                        <img class="h-10 w-10 rounded-full" :src="profile" alt="">
                        <div class="flex flex-col ml-4">
                            <p class="font-semibold">Jane Doe</p>
                            <p class="text-sm">Admin</p>
                        </div>
                    </div>
                </div>
                <!-- Children -->
                <slot></slot>
            </div>
        </div>
    </section>
</template>