<script setup>
import { ref } from 'vue';


const features = ref([
    'Powerful online protection.',
    'Internet without borders.',
    'Supercharged VPN',
    'No specific time limits.'
]);

</script>

<template>
    <div class="flex lg:flex-row items-center sm:flex-col mt-10">
        <div class="min-w-32 justify-center">
            <img class="object-contain" src="https://next-landing-vpn.vercel.app/_next/image?url=%2Fassets%2FIllustration2.png&w=1920&q=100" alt="">
        </div>
        <div class="flex flex-col lg:ml-32 sm:mt-16 lg:mt-0">
            <h1 class="text-3xl font-semibold mb-2">We Provide Many Features You Can Use</h1>
            <p class="text-sm text-gray-500 pb-3">You can explore the features that we provide with fun and have their own functions each feature.</p>
            <div class="flex flex-row items-center" v-for="feat in features" :key="feat">
                <i class="pi pi-check-circle text-green-500 pr-3"></i>
                <!-- TODO: should enlarge text upon hover -->
                <p class="text-sm text-gray-500">{{ feat }}</p>
            </div>
           
        </div>
    </div>
</template>