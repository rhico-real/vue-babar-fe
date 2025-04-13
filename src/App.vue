<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useUserProfileStore } from '@/stores/userProfile';

const userProfileStore = useUserProfileStore();

onMounted(async () => {
  // Try to load user profile when app starts
  try {
    await userProfileStore.fetchProfile();
  } catch (error) {
    // Silent fail - the store will handle error state
    console.log('User not authenticated or profile fetch failed');
  }
});
</script>

<template>
  <main class="bg-background h-screen">
    <RouterView/>
  </main>
</template>
