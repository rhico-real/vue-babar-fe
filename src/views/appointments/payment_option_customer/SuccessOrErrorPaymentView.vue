<script setup>
import bg1 from '@/assets/landing/bg-1.png';
import success from '@/assets/landing/success.png';
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button'
import router from '@/router';
import { useRoute } from 'vue-router'
import { Loader2 } from 'lucide-vue-next';

const route = useRoute();
const id = route.params.id;
const result = route.params.result;

const referenceCode = ref('');
const loadingButton = ref(false);
const isAnimated = ref(false);

onMounted(() => {
    // Trigger animation on mount
    setTimeout(() => {
        isAnimated.value = true;
    }, 100);
});

const checkAppointment = () => {
    router.push('/appointment/'+id);
}

const showReferenceCode = ref(false);

</script>

<template>
    <section class="overflow-y-auto">
        <div class="flex flex-col md:flex-row min-h-screen">
            <!-- Color sidebar -->
            <div class="w-full md:w-6/12 h-64 md:h-screen bg-landing-paymentblue">
                <img class="h-full object-cover w-full" :src="bg1" alt="background 1">
            </div>

            <!-- Result -->
            <div class="w-full md:w-6/12 min-h-screen px-6 md:px-10 lg:px-20 py-10">
                <h1 class="text-2xl md:text-3xl font-bold text-center">Successfully processed payment!</h1>
                <p class="text-center text-gray-500 mt-2">Thank you for using BABAR APPOINTMENT SYSTEM</p>
                
                <div class="flex items-center justify-center mt-6 md:mt-10">
                    <img 
                        :src="success" 
                        alt="successimage" 
                        class="w-9/12 md:w-7/12 transform transition-all duration-500 ease-out"
                        :class="{ 'scale-100 translate-y-0 opacity-100': isAnimated, 'scale-90 translate-y-4 opacity-0': !isAnimated }"
                    >
                </div>
                <div class="flex items-center justify-center">
                    <div class="w-full md:w-70">
                        <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            Please wait
                        </Button>
                        <Button v-if="!loadingButton" @click="checkAppointment" class="mt-5 w-full bg-main">Check your Appointment Status</Button>
                        
                        <RouterLink 
                            to="/"
                            class="hover:underline text-blue-500 text-center block">
                            <h1 class="mt-5 underline text-blue-500">Back to Home</h1>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
    }
}

img[alt="successimage"] {
    animation: pulse 1s ease-in-out infinite;
}
</style>