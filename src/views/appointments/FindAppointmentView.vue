<script setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import { useToast } from "vue-toastification";
import axios from 'axios';
import router from '@/router';

const toast = useToast();

const referenceCode = ref('');
const fullName = ref('');
const dateOfAppointment = ref('');

const query = async () => {
    if(referenceCode.value){
        try{
            const payload = {
                'reference_code': referenceCode.value
            }
            const response = await axios.post(
                'http://127.0.0.1:8000/api/find_appointment/', 
                payload, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNzQzNjY1LCJpYXQiOjE3NDI2NTcyNjUsImp0aSI6IjhhYjkxOWU5ZTk4ZDQyMDdhODFiMjU2YjY1OGQxOTQ2IiwidXNlcl9pZCI6MX0.fODyrRIFI_r48Nau6MzW1efoJBfMq_5PrtI-3tNXzd4'
                    }
                });

            router.push(`/appointment/${referenceCode.value}`)
            console.log(response.data);
        } catch(e){
            console.log(e);
            toast.error("Appointment not found.");
        }
        
    } else {
        toast.error("No reference code.");
    }
}

</script>

<template>
    <section class="flex flex-col h-screen items-center justify-center">
        <!-- Already booked an appointment? -->
        <div class="w-1/2 flex flex-col items-center">
            <h1 class="text-2xl font-bold">Already booked an appointment?</h1>

            <div class="flex flex-col mt-10 w-full">
                <label class="font-semibold">Enter reference code here:</label>
                <input v-model="referenceCode" class="border-2 px-2 py-1" type="text" placeholder="Reference Code">
            </div>
        </div>
        <!-- Forgot reference code? -->
        <div class="mt-20 flex flex-col items-center w-1/2">
            <h1 class="text-2xl font-bold">Forgot Reference Code?</h1>

            <div class="flex flex-col mt-10 w-full">
                <label class="font-semibold">Enter Full Name here:</label>
                <input v-model="fullName" class="border-2 px-2 py-1" type="text" placeholder="Full Name">
            </div>

            <div class="flex flex-col mt-10 w-full">
                <label class="font-semibold">Enter date of appointment:</label>
                <input v-model="dateOfAppointment" class="border-2 px-2 py-1" type="date" placeholder="Date of Appointment">
            </div>
        </div>
        <!-- Note -->
         <div class="flex flex-col w-1/2 items-center mt-20">
            <p class="text-sm text-red-600">Note: Appointments might be inaccurate if you have the same name and date of appointment.</p>
            <p class="text-sm text-red-600">Please use <span class="underline">reference code</span> for more accurate details.</p>
         </div>
        <!-- Button -->
        <Button class="mt-20" @click="query" text="Check Appointment"></Button>
    </section>
</template>