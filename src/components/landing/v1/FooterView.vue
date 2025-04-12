<script setup>
import { RouterLink } from 'vue-router';
import logo from '@/assets/img/logo.png'
import { reactive } from 'vue';

const state = reactive({
    footers: [
        {
            title: 'Product',
            details: [
                'Download',
                'Pricing',
                'Locations',
                'Server',
                'Countries',
                'Blog'
            ]
        },
        {
            title: 'Engage',
            details: [
                'LaslesVPN',
                'FAQ',
                'Tutorials',
                'About Us',
                'Privacy Policy',
                'Terms of Service'
            ]
        },
        {
            title: 'Earn Money',
            details: [
                'Affiliate',
                'Become a Partner'
            ]
        }
    ]
});
</script>

<template>
    <footer>
        <div class="flex sm:flex-col lg:flex-row justify-between items-center py-20">
            <!-- div for logo -->
            <div class="flex lg:w-6/12 flex-col items-center lg:items-start lg:mr-24 sm:mb-10">
                <div class="flex sm:justify-center lg:justify-start items-center mb-2">
                    <img class="h-8" :src="logo" alt="Vue Jobs">
                    <p class="font-bold text-sm">Vue Jobs</p>
                </div>
                <p class="text-sm text-gray-500 mb-5">LaslesVPN is a private virtual network that has unique features and has high security.</p>
                <p class="text-sm text-gray-400">&copy;2025 - LaslesVPN</p>
            </div>
            <!-- div for product -->
            <div class="flex lg:w-5/12 sm:w-full">
                <div class="flex xl:flex-1 flex-col sm:mb-10 xl:mb-0 sm:w-full sm:items-start" v-for="foot in state.footers" :key="foot">
                    <p class="text-sm font-semibold sm:mb-3 xl:mb-5">{{ foot.title }}</p>
                    <div v-for="detail in foot.details" :key="detail">
                        <RouterLink :to="'/' + detail.toLowerCase()" class="text-sm text-gray-500 mb-2 hover:text-red-500">{{ detail }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>