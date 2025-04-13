<script setup>
import { ref, computed, onMounted } from 'vue';
import notificationIcon from '@/assets/img/notification.png';
import logo from '@/assets/img/logo-1.png';
import profile from '@/assets/img/profile/profile.jpg';
import { useRoute, RouterLink } from 'vue-router';
import LogoutDialog from '@/components/dashboard/dialogs/LogoutDialog.vue';
import Input from '@/components/ui/input/Input.vue';
import { useUserProfileStore } from '@/stores/userProfile';

const route = useRoute();

const isActiveLink = (routePath) => {
    return route.path === routePath;
}

const sidebarNavs = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: 'pi-chart-line'
    },
    {
        title: 'Manage Appointments',
        to: '/dashboard/manage-appointments',
        icon: 'pi-clock'
    },
    {
        title: 'Manage Patients',
        to: '/dashboard/manage-patients',
        icon: 'pi-user'
    },
    {
        title: 'Calendar',
        to: '/dashboard/calendar',
        icon: 'pi-calendar'
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

//profile
const userProfileStore = useUserProfileStore();

const userFullName = computed(() => userProfileStore.userFullName);
const userRole = computed(() => userProfileStore.userRole);
const userPhotoUrl = computed(() => userProfileStore.userPhoto || profile);
</script>

<template>
    <section class="h-screen flex">
      <!-- Sidebar Navigation (Collapsible) -->
      <div :class="['flex', 'flex-col', sidebarCollapsed ? 'w-16' : 'w-56', 'bg-main', 'h-screen', 'transition-width', 'duration-300']">
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
                <i class="text-white pr-4" :class="['pi', nav.icon]"></i>
                <p v-if="!sidebarCollapsed" class="text-white text-sm">{{ nav.title }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
  
        <!-- Back to Home, Settings & Logout -->
        <div class="flex flex-col py-10">
          <RouterLink class="w-full" to="/">
            <div class="flex items-center py-4 px-4 hover:bg-gray-500/50">
              <i class="pi pi-home text-yellow-500 pr-4"></i>
              <p v-if="!sidebarCollapsed" class="text-white text-sm">Back To Home</p>
            </div>
          </RouterLink>
          <RouterLink class="w-full" to="/dashboard/settings">
            <div class="flex items-center py-4 px-4" :class="isActiveLink('/dashboard/settings') ? 'bg-dashboard-selected' : 'hover:bg-gray-500/50'">
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
                <RouterLink class="flex cursor-pointer" to="/profile">
                  <img class="h-10 w-10 rounded-full object-cover" :src="userPhotoUrl" alt="profile">
                  <div class="flex flex-col ml-4">
                      <p class="font-semibold">{{ userFullName || 'Jane Doe'}}</p>
                      <p class="text-sm">{{ userRole || 'Guest'}}</p>
                  </div>
                </RouterLink>
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