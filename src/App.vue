<script setup>
import {RouterView} from 'vue-router';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <main class="bg-background h-screen">
    <Navbar/>
    <RouterView/>
  </main>
 
</template>
