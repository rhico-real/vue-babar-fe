<script setup>
import { RouterView } from 'vue-router';
import { onMounted, watch } from 'vue';

import { useToast } from 'vue-toastification';
import { initialAPICalls } from '@/utils/stores_helper';
import { useSettingsStore } from '@/stores/settings';
import { updateSiteConfiguration } from '@/utils/dynamic_site_config';

const toast = useToast();
const settingsStore = useSettingsStore();

onMounted(async () => {
  // Try to load user profile when app starts
  try {
    await initialAPICalls();
    
    // Update document title and favicon based on settings
    updateSiteConfiguration({
      name: settingsStore.name,
      favicon: settingsStore.favicon
    });
  } catch (error) {
    toast.error("Profile fetch failed.");
    console.error(error);
  }
});

// Watch for changes to settings and update the title and favicon
watch(
  () => [settingsStore.name, settingsStore.favicon], 
  () => {
    updateSiteConfiguration({
      name: settingsStore.name,
      favicon: settingsStore.favicon
    });
  }
);
</script>

<template>
  <main class="bg-background h-screen">
    <RouterView/>
  </main>
</template>
