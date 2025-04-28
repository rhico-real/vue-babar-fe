<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import Button from '@/components/common/Button.vue';
import { BASEURL, httpPost } from '@/utils/http_config.js';
import { Loader2 } from 'lucide-vue-next';
import { Button as CustomButton } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import  router from '@/router';

const httpFindAppointment = `${BASEURL}/api/find_appointment_by_reference/`;

const route = useRoute();
const toast = useToast();

const referenceCode = route.params.id;

const state = reactive({
    numberOnQueue: '',
    timeEstimate: '',
    date: '',
    payment_status: ''
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
        state.payment_status = response.data['payment_status'];
    }catch(e){
        console.error(e);
        toast.error('Error fetching appointment.');
    }
});

const paynow = () => {
    router.push('/appointment/pay/'+referenceCode);
}
</script>

<template>
    <section class="flex flex-col px-4 py-8 md:py-10 md:mt-10 min-h-screen overflow-y-auto items-center justify-start md:justify-center">
        <!-- title -->
        <h1 class="font-bold text-xl md:text-2xl text-center">Thank you for using BABAR APPOINTMENT SYSTEM!</h1>
        
        <!-- Number on the queue -->
        <div class="flex flex-col items-center mt-8 md:mt-16">
            <h2 class="text-lg md:text-xl font-semibold text-center">You are number</h2>
            <h1 class="text-red-500 text-2xl md:text-3xl font-bold">{{ state.numberOnQueue }}</h1>
            <h2 class="text-lg md:text-xl font-semibold text-center">on the queue for your appointment.</h2>
        </div>
        
        <!-- Time estimate -->
        <div class="flex flex-col items-center mt-10 md:mt-20">
            <h2 class="text-center">You can arrive on or before:</h2>
            <h1 class="text-red-500 text-base md:text-lg font-bold text-center">{{ state.timeEstimate }}</h1>
            <h2 class="text-red-500 text-base md:text-lg font-bold text-center">{{ state.date }}</h2>
        </div>

        <!-- Take note of the reference code -->
        <div class="mt-10 md:mt-20 flex flex-col items-center">
            <h1 class="font-bold text-center">Please take note of this reference code to know again your number:</h1>
            <p class="font-bold text-blue-700 underline break-all text-center">{{ referenceCode }}</p>
        </div>

        <div class="mt-10 md:mt-20 flex flex-col md:flex-row items-center">
            <p class="font-bold mb-2 md:mb-0 md:mr-2">Payment Status:</p>
            <button type="button" 
            :class="[
                'flex items-center text-sm font-medium px-3 py-1.5 tracking-wide rounded-full',
                {
                    'text-red-600 bg-red-50': state.payment_status === 'UNPAID',
                    'text-yellow-600 bg-yellow-50': state.payment_status === 'PENDING',
                    'text-green-600 bg-green-50': state.payment_status !== 'PAID'
                }
            ]"
            >
                <i class="pi pi-check mr-2" v-if="state.payment_status === 'PAID'"></i>
                <i class="pi pi-times mr-2" v-if="state.payment_status === 'UNPAID'"></i>
                <i class="pi pi-clock mr-2" v-if="state.payment_status === 'PENDING'"></i>
                {{ state.payment_status }}
            </button>
            <CustomButton v-if="state.payment_status === 'UNPAID'" @click="paynow" class="mt-3 md:mt-0 md:ml-5 bg-white border-main border-2 text-main hover:text-white">Pay Now</CustomButton>
        </div>
         
        <!-- Book another appointment button -->
        <RouterLink to="/appointment/create" class="mt-10 md:mt-20">
            <Button text="Book Another Appointment"></Button>
        </RouterLink>
    </section>
</template>