<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from '@/components/Button.vue';

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

        const response = await axios.post(
            'http://127.0.0.1:8000/api/find_appointment/', 
            payload, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNzQzNjY1LCJpYXQiOjE3NDI2NTcyNjUsImp0aSI6IjhhYjkxOWU5ZTk4ZDQyMDdhODFiMjU2YjY1OGQxOTQ2IiwidXNlcl9pZCI6MX0.fODyrRIFI_r48Nau6MzW1efoJBfMq_5PrtI-3tNXzd4'
                }
            });
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