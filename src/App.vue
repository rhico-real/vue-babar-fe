<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserProfileStore } from '@/stores/userProfile';
import { useToast } from 'vue-toastification';

const toast = useToast();
const userProfileStore = useUserProfileStore();

onMounted(async () => {
  // Try to load user profile when app starts
  try {
    await userProfileStore.fetchProfile();
  } catch (error) {
    toast.error("Profile fetch failed.");
    console.log('User not authenticated or profile fetch failed');
  }
});
</script>

<template>
  <main class="bg-background h-screen">
    <RouterView/>
  </main>
</template>
