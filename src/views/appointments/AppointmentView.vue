<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from '@/components/common/Button.vue';
import { BASEURL, httpPost } from '@/utils/http_config.js';

const httpFindAppointment = `${BASEURL}/api/find_appointment_by_reference/`;

const route = useRoute();
const toast = useToast();

const referenceCode = route.params.id;

const state = reactive({
    numberOnQueue: '',
    timeEstimate: '',
    date: ''
});

onMounted( async () => {
    try{
        const payload = {
            'reference_code': referenceCode
        };
        
        const response = await httpPost(httpFindAppointment, payload, false);

        state.numberOnQueue = response.data['queue_number'];
        state.timeEstimate = response.data['time_estimate'];
        state.date = response.data['date'];
    }catch(e){
        console.error(e);
        toast.error('Error fetching appointment.');
    }
});
</script>

<template>
    <section class="flex flex-col mt-20 h-screen items-center justify-center">
        <!-- title -->
        <h1 class="font-bold text-2xl">Thank you for using BABAR APPOINTMENT SYSTEM!</h1>
        
        <!-- Number on the queue -->
        <div class="flex flex-col items-center mt-16">
            <h2 class="text-xl font-semibold">You are number</h2>
            <h1 class="text-red-500 text-3xl font-bold">{{ state.numberOnQueue }}</h1>
            <h2 class="text-xl font-semibold">on the queue for your appointment.</h2>
        </div>
        
        <!-- Time estimate -->
        <div class="flex flex-col items-center mt-28">
            <h2>You can arrive on or before:</h2>
            <h1 class="text-red-500 text-lg font-bold">{{ state.timeEstimate }}</h1>
            <h2 class="text-red-500 text-lg font-bold">{{ state.date }}</h2>
        </div>

        <!-- Take note of the reference code -->
        <div class="mt-28 flex flex-col items-center">
            <h1 class="font-bold">Please take note of this reference code to know again your number:</h1>
            <p class="font-bold text-blue-700 underline">{{ referenceCode }}</p>
        </div>
         

        <!-- Book another appointment button -->
        <RouterLink to="/appointment/create" class="mt-28">
            <Button text="Book Another Appointment"></Button>
        </RouterLink>
    </section>
</template>