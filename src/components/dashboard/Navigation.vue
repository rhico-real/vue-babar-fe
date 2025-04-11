<script setup>
import { ref, computed } from 'vue';
import notificationIcon from '@/assets/img/notification.png';
import logo from '@/assets/img/logo-1.png';
import profile from '@/assets/img/profile.png';
import { useRoute, RouterLink } from 'vue-router';
import LogoutDialog from '@/components/dashboard/dialogs/LogoutDialog.vue';
import Input from '@/components/ui/input/Input.vue';

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
        title: 'Manage Appointments',
        to: '/dashboard/manage-appointments'
    },
    {
        title: 'Manage Patients',
        to: '/dashboard/manage-patients'
    },
    {
        title: 'Calendar',
        to: '/dashboard/calendar'
    }
];

const sidebarCollapsed = ref(false);
const searchQuery = ref('');

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const filteredNavs = computed(() => {
  if (!searchQuery.value) return sidebarNavs;
  
  return sidebarNavs.filter(nav => 
    nav.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

</script>

<template>
    <section class="h-screen flex">
      <!-- Sidebar Navigation (Collapsible) -->
      <div :class="['flex', 'flex-col', sidebarCollapsed ? 'w-16' : 'w-56', 'bg-sidebar', 'h-screen', 'transition-width', 'duration-300']">
         <!-- Toggle Button -->
         <div class="flex items-center justify-end">
            <button @click="toggleSidebar" class="px-2 py-1 text-black focus:outline-none bg-gray-400/25 rounded-xl m-2">
                <i :class="['pi', sidebarCollapsed ? 'pi-chevron-right' : 'pi-chevron-left', 'text-sm']"></i>
            </button>
        </div>
        <!-- Logo -->
        <img v-if="!sidebarCollapsed" class="py-4 px-6" :src="logo" alt="BAS logo">
        
        <!-- Search Bar (Only visible when sidebar is expanded) -->
        <div v-if="!sidebarCollapsed" class="px-4 mb-4">
          <Input 
            v-model="searchQuery"
            placeholder="Search..." 
            class="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-neutral-400"
          />
        </div>
  
        <!-- Navigation Links -->
        <div class="flex flex-col flex-1">
          <div v-for="nav in filteredNavs" :key="nav.to" class="flex">
            <RouterLink class="w-full" :to="nav.to">
              <div class="flex items-center py-4 px-4" :class="isActiveLink(nav.to) ? 'bg-dashboard-selected' : 'hover:bg-gray-500/50'">
                <i class="pi pi-clock text-white pr-4"></i>
                <p v-if="!sidebarCollapsed" class="text-white text-sm">{{ nav.title }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
  
        <!-- Settings & Logout -->
        <div class="flex flex-col py-10">
          <RouterLink class="w-full" to="/dashboard/settings">
            <div class="flex items-center py-4 px-4" :class="isActiveLink('/dashboard/settings') ? 'bg-dashboard-selected' : ''">
              <i class="pi pi-cog text-white pr-4"></i>
              <p v-if="!sidebarCollapsed" class="text-white text-sm">Settings</p>
            </div>
          </RouterLink>
          <LogoutDialog :sidebarCollapsed="sidebarCollapsed"></LogoutDialog>
        </div>
      </div>
      
      <!-- Right side Content -->
      <div class="flex flex-1 flex-col">
        <!-- topbar navigation -->
        <div class="flex w-full py-6 px-10">
            <div class="flex flex-1 items-center justify-end">
                <img class="h-6 w-6 mr-6" :src="notificationIcon" alt="">
                <img class="h-10 w-10 rounded-full" :src="profile" alt="">
                <div class="flex flex-col ml-4">
                    <p class="font-semibold">Jane Doe</p>
                    <p class="text-sm">Admin</p>
                </div>
            </div>
        </div>
        <!-- main content -->
        <div class="flex-1 overflow-auto bg-dashboard-background">
          <slot></slot>
        </div>
      </div>
    </section>
</template>

<style scoped>
    .transition-width {
    transition: width 0.3s ease;
    }
</style>