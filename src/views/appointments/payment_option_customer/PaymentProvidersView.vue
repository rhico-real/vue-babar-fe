<script setup>
import { Loader2 } from 'lucide-vue-next';
import bg2 from '@/assets/landing/bg-2.png';
import gcashlogo from '@/assets/landing/gcash.png';
import gcashqr from '@/assets/landing/gcashqr.png';
import mayalogo from '@/assets/landing/maya.png';
import mayaqr from '@/assets/landing/mayaqr.png';
import qrphlogo from '@/assets/landing/qrph.png';
import qrphqr from '@/assets/landing/qrphqr.png';
import { Button } from '@/components/ui/button'
import  router from '@/router';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute();
const id = route.params.id;
const loadingButton = ref(false);

const sendproofofpayment = () => {
    loadingButton.value = true;
    router.push(id + '/proof-of-payment');
}

</script>

<template>
    <div class="relative w-full min-h-screen overflow-y-auto">
        <!-- Top Right Image -->
        <img :src="bg2" 
            class="absolute top-0 right-0 w-1/4 md:w-3/12 object-cover rotate-180 z-10" 
            alt="Top Right" />

        <!-- Bottom Left Image -->
        <img :src="bg2" 
            class="absolute bottom-0 left-0 w-1/4 md:w-3/12 object-cover z-10" 
            alt="Bottom Left" />
        
        <!-- Main Content -->
        <div class="text-center mt-10 px-4">
            <h1 class="text-2xl md:text-3xl font-bold">Payment Options</h1>
            <p class="mt-3 text-gray-500">Pay through one of these options. </p> 
            <p class="text-gray-500">After payment, please click the button below to send your <span class="underline">Proof of Payment.</span></p>
        </div>

        <div class="flex flex-col md:flex-row justify-center md:space-x-6 space-y-6 md:space-y-0 mt-10 z-10 px-4 md:px-8">
            <div class="bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 md:p-6 w-full md:w-1/3 lg:w-1/4 z-10">
                <div class="h-16 md:h-20 flex items-center mb-6 md:mb-10 mt-4 md:mt-6">
                    <img :src="gcashlogo" alt="gcashlogo" class="max-h-full max-w-full object-contain">
                </div>
                <div class="h-48 md:h-64 lg:h-80 flex items-center">
                    <img :src="gcashqr" alt="gcashqr" class="max-h-full max-w-full object-contain">
                </div>
                <h1 class="mt-6 md:mt-8 font-bold text-sm md:text-base">Gcash #: 09123123123</h1>
            </div>
            <div class="bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 md:p-6 w-full md:w-1/3 lg:w-1/4 z-10">
                <div class="h-16 md:h-20 flex items-center mb-6 md:mb-10 mt-4 md:mt-6">
                    <img :src="mayalogo" alt="mayalogo" class="max-h-full max-w-full object-contain">
                </div>
                <div class="h-48 md:h-64 lg:h-80 flex items-center">
                    <img :src="mayaqr" alt="mayaqr" class="max-h-full max-w-full object-contain">
                </div>
                <h1 class="mt-6 md:mt-8 font-bold text-sm md:text-base">Maya #: 09123123123</h1>
            </div>
            <div class="bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 md:p-6 w-full md:w-1/3 lg:w-1/4 z-10">
                <div class="h-16 md:h-20 flex items-center mb-6 md:mb-10 mt-4 md:mt-6">
                    <img :src="qrphlogo" alt="qrphlogo" class="max-h-full max-w-full object-contain">
                </div>
                <div class="h-48 md:h-64 lg:h-80 flex items-center">
                    <img :src="qrphqr" alt="qrphqr" class="max-h-full max-w-full object-contain">
                </div>
                <h1 class="mt-6 md:mt-8 font-bold text-sm md:text-base">Scan using any app.</h1>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center my-12 md:my-16 px-4">
            <div class="w-full md:w-2/3 lg:w-1/3">
                <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                </Button>
                <Button v-if="!loadingButton" @click="sendproofofpayment" class="mt-5 w-full bg-main">Send Proof of Payment</Button>
            </div>
            <RouterLink 
                to="/"
                class="hover:underline text-blue-500">
                <h1 class="mt-5 underline text-blue-500">Back to Home</h1>
            </RouterLink>
            
        </div>

    </div>

</template>