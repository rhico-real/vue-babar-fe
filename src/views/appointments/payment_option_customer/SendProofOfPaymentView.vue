<script setup>
import { Loader2 } from 'lucide-vue-next';
import bg2 from '@/assets/landing/bg-2.png';
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import { httpPost, httpFindAppointmentByReference, httpPayViaReferenceNumber } from '@/utils/http_config.js';
import { mapToOneAppointmentModel } from '@/models/appointments/appointment_model';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import  router from '@/router';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const id = route.params.id;

onMounted( async () => {
    await findAppointment();
});

const appointment = ref(null);
const paymentReferenceNumber = ref('');
const loadingButton = ref(false);
const defaultValue = ref('');

const findAppointment = async () => {
    const payload = {
        reference_code: id
    };

    const data = await httpPost(httpFindAppointmentByReference, payload, false);
    appointment.value = mapToOneAppointmentModel(data.data);

    console.log(appointment.value);
}

const payviareferencenumber = async () => {
    loadingButton.value = true;

    const payload = {
        reference_code: id,
        payment_reference_number: paymentReferenceNumber.value
    };

    const data = await httpPost(httpPayViaReferenceNumber, payload, false)
    console.log(data.data);

    loadingButton.value = false;

    if(data.status == 201){
        router.push('proof-of-payment/success');
    } else{
        toast.error('Error paying appointment. Please contact administrator.')
    }
    
}

</script>

<template>
    <div class="relative w-full min-h-screen overflow-y-auto pb-20">
        <!-- Top Right Image -->
        <img :src="bg2" 
            class="absolute top-0 left-0 w-1/4 md:w-2/12 object-cover z-10" 
            alt="Top Right" />

        <!-- Bottom Left Image -->
        <img :src="bg2" 
            class="absolute bottom-0 right-0 w-1/4 md:w-2/12 object-cover z-10 rotate-180" 
            alt="Bottom Left" />
        
        <!-- Main Content -->
        <div class="text-center mt-10 px-4">
            <h1 class="text-2xl md:text-3xl font-bold">Send Proof of Payment</h1>
            <p class="text-gray-500">Please verify your details below before paying.</p>
            <br>
            <p class="text-gray-500">You may type in the reference number on your Gcash/Maya/Qrph receipt below.</p>
            <p class="text-gray-500">Alternatively, you can also take a screenshot of your receipt, and upload it below.</p>
        </div>

        <div class="flex items-center justify-center mt-10 px-4">
            <div v-if="appointment" class="w-full max-w-md">
                <h1>You are paying as:</h1>
                <br>
                <p>Full Name: <strong class="text-red-500">{{ appointment.full_name }}</strong> </p>
                <p>Email: <strong class="text-red-500">{{ appointment.email }}</strong> </p>
                <p>Phone Number: <strong class="text-red-500">{{ appointment.phone_number }}</strong> </p>
                <p>Reason: <strong class="text-red-500">{{ appointment.reason }}</strong> </p>
                <p>Date of Appointment: <strong class="text-red-500">{{ appointment.date }}</strong></p>
            </div>
            <div v-else>
                <p>Loading Appointment...</p>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center mt-10 md:mt-20 px-4">
            <div class="w-full md:w-2/3 lg:w-4/12">
                <Label for="refcode" class="text-right text-base md:text-xl font-bold">
                    Enter Reference Number of your Gcash/Maya/QrPH receipt:
                </Label>
                <Input v-model="paymentReferenceNumber" id="refcode" class="col-span-3 mt-3 text-base md:text-xl h-10"/>
                <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                </Button>
                <Button v-if="!loadingButton" @click="payviareferencenumber" class="mt-5 w-full bg-main">Finish Payment</Button>
            </div>
            </div> 
        </div>

        <div class="flex items-center justify-center mt-10 md:mt-20 px-4">
            <div class="w-full md:w-2/3 lg:w-4/12">
                <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
                    <AccordionItem value="item-1">
                        <AccordionTrigger class="text-base md:text-xl">Want to upload a screenshot instead?</AccordionTrigger>
                        <AccordionContent class="bg-gray-50 p-4 md:p-10">
                            <div class="flex flex-col items-center justify-center">
                                <Label for="refcode" class="text-right text-base md:text-xl font-bold">
                                    Upload your Gcash/Maya/QrPH receipt:
                                </Label>
                                <Input v-model="referenceCode" id="refcode" class="col-span-3 mt-3 text-sm h-10" type="file"/>
                                <Button v-if="loadingButton" disabled class="mt-5 w-full bg-main">
                                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                                    Please wait
                                </Button>
                                <Button v-if="!loadingButton" @click="paynow" class="mt-5 w-full bg-white border-main border-2 text-main hover:text-white">Pay with Screenshot</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>


        <div class="flex flex-col items-center justify-center mt-16 md:mt-24 lg:mt-36 px-4">
            <RouterLink 
                to="/"
                class="hover:underline text-blue-500">
                <h1 class="mt-5 underline text-blue-500">Back to Home</h1>
            </RouterLink>
        </div>

    </div>

</template>