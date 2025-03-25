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
    <section class="h-screen">
        <div class="flex h-full">
            <div class="shrink-0 flex flex-col w-56 bg-sidebar h-screen">
                <img class="py-8 px-10" :src="logo" alt="BAS logo">
                
                <!-- Sidebar Navigation (aka Left Side) -->
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
                </div>   
            </div>

            <!-- Topbar navigation (aka Right Side) -->
            <div class="flex flex-1 flex-col">
                <div class="flex w-full py-6 px-10">
                    <!-- notification and profile -->
                    <div class="flex flex-1 items-center justify-end">  
                        <img class="h-6 w-6 mr-6" :src="notificationIcon" alt="">
                        <img class="h-10 w-10 rounded-full" :src="profile" alt="">
                        <div class="flex flex-col ml-4">
                            <p class="font-semibold">Jane Doe</p>
                            <p class="text-sm">Admin</p>
                        </div>
                    </div>
                </div>

                <!-- Children -->
                <div class="flex-1 overflow-auto bg-dashboard-background">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
</template>